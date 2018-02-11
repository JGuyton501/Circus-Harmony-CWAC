var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('CategoryController', function($scope, $http) {

	$scope.categories = null;


	$scope.getCategories = function(){

		var config = {};
		config.method = 'get';
		config.url= 'http://www.json-generator.com/api/json/get/cfKzddmdlu?indent=2';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.categories= response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	$scope.renderChart = function(){
        if(document.getElementById('categories-chart')==null){
            return;
        }

        var categoryCtx = document.getElementById('categories-chart').getContext('2d');
        console.log(categoryCtx);


var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: 'red',
                data: [
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor()
                ]
            }, {
                label: 'Dataset 2',
                backgroundColor: 'blue',
                data: [
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor()
                ]
            }, {
                label: 'Dataset 3',
                backgroundColor: 'green',
                data: [
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor()
                ]
            }]

        };

        var config = {
            type: 'bar',
            data: barChartData,
            options: {
                title:{
                    display:true,
                    text:"Chart.js Bar Chart - Stacked"
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        };

        $scope.categoriesChart = new Chart(categoryCtx, config);

        console.log($scope.categoriesChart);

	};

    $scope.randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

	$scope.getCategories();

	$scope.renderChart();

});
