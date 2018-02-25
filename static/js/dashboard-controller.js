var app = app || angular.module('circusApp', []);

app.controller('DashboardController', function($scope,DataService, $rootScope) {

    $scope.init = function(){
        $scope.data = DataService;

        $scope.$on('statistics-loaded', function(){
            $scope.renderOverviewChart();
            $scope.renderStackedChart();
        });

        console.log($scope);
        
    };

    $scope.renderOverviewChart = function(statistic){

        statistic = statistic || 'categories';

        $scope.buildOverviewData();

        if (typeof $scope.overviewChart !== "undefined") {
            $scope.overviewChart.unload();
        }

    	$scope.overviewChart = c3.generate({
    		bindto: '#overview-chart',
    		data: {
    			columns: $scope.overview[statistic].data,
    			type : 'pie',
    			onclick: function (d, i) { /* console.log("onclick", d, i); */ },
    			onmouseover: function (d, i) { /* console.log("onmouseover", d, i); */ },
    			onmouseout: function (d, i) { /* console.log("onmouseout", d, i); */ }
    		}
		});
    
    };

    $scope.renderStackedChart = function(statistic){

        statistic = statistic || 'locations';

        $scope.buildStackedData();

        if (typeof $scope.stackedChart !== "undefined") {
            $scope.stackedChart.unload();
        }

        $scope.stackedChart = c3.generate({
            bindto: '#stacked-chart',
            data: {
                x: 'x',
                columns: $scope.stacked,
                type: 'bar',
                groups: [$scope.stackedY]
            },
            axis: {
                x: {
                    type: 'category'
                }
            }
        });

        /*
        columns example for stacked data

        columns:    [
            ['x','category1','category2','category3','category4'],
            ['location1', -30, 200, 200, 400],
            ['location2', 130, 100, -100, 200],
            ['location3', -230, 200, 200, -300]
        ],
        */
    
    };

    $scope.buildStackedData = function(){
        
        $scope.stacked = [];

        /* build x axis */
        /* categories */
        var xAxis = [];
        for (var i = $scope.data.categories.length - 1; i >= 0; i--) {
            xAxis.push($scope.data.categories[i].name);
        }

        $scope.stackedX = angular.copy(xAxis);
        xAxis.unshift('x');
        $scope.stacked.push(xAxis);

        /* build y axis */
        /* locations */
        var yAxis = [];
        for (var i = $scope.data.locations.length - 1; i >= 0; i--) {
            yAxis.push($scope.data.locations[i].name);
        }

        $scope.stackedY = angular.copy(yAxis);

        /* build y axis per location */
        /* count of categories per location */
        for (var z = $scope.data.locations.length - 1; z >= 0; z--) {
            /* for each location */
            var locationId = $scope.data.locations[z].location_id;
            var locationName = $scope.data.locations[z].name;
            var locationData = [locationName];
            for (var x = $scope.data.categories.length - 1; x >= 0; x--) {
                /* for each category in location z */            
                var categoryId = $scope.data.categories[x].category_id;
                var count = 0;
                var hours = 0;
                for (var y = $scope.data.shifts.length - 1; y >= 0; y--) {
                    if (parseInt($scope.data.shifts[y].location)==locationId&&$scope.data.shifts[y].category_id==categoryId){
                        count++;
                        hours += ( DataService.utils.getDurationBetween($scope.data.shifts[y].start_time,$scope.data.shifts[y].end_time) / (1000 * 60 * 60) );
                    }
                }
                
                locationData.push(hours);
                //locationData.push(count);
            }
            $scope.stacked.push(locationData);
        }

    };

    $scope.buildOverviewData = function(){

        $scope.overview = {};

        for (var stat in $scope.data.statistics) {
            $scope.overview[stat] = {};
            $scope.overview[stat].data = [];

            for (var prop in stat) {

                var data = [];

                if (typeof $scope.data.statistics[stat][prop] !== "undefined") {
                    var statName = $scope.data.statistics[stat][prop].name;
                    var statCount = $scope.data.statistics[stat][prop].count;
                    data.push(statName);
                    data.push(statCount);
                }

                if (data.length){
                    $scope.overview[stat].data.push(data);
                }

            }
        }

    };


    $scope.buildChartData = function(){

        $scope.overview = {};

        for (var stat in $scope.data.statistics) {
            $scope.overview[stat] = {};
            $scope.overview[stat].data = [];

            for (var prop in stat) {

                var data = [];

                if (typeof $scope.data.statistics[stat][prop] !== "undefined") {
                    var statName = $scope.data.statistics[stat][prop].name;
                    var statCount = $scope.data.statistics[stat][prop].count;
                    data.push(statName);
                    data.push(statCount);
                }

                if (data.length){
                    $scope.overview[stat].data.push(data);
                }

            }
        }

        console.log($scope.overview);

    };

	$scope.init();

});