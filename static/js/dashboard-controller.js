var app = app || angular.module('circusApp', []);

app.controller('DashboardController', function($scope,DataService, $rootScope) {

    $scope.init = function(){
        $scope.data = DataService;

        $scope.rootScope = $rootScope;

        $scope.$on('statistics-loaded', function(){
            $scope.renderOverviewChart();
        });
        
    };

    $scope.renderOverviewChart = function(statistic){

        statistic = statistic || 'categories';

        $scope.buildChartData();

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

                $scope.overview[stat].data.push(data);

            }
        }
    };

	$scope.init();

});