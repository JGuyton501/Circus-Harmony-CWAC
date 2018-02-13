var app = app || angular.module('circusApp', []);

app.controller('CategoryController', function($scope,DataService) {

    $scope.init = function(){

        $scope.Data = DataService;
        $scope.renderChart();

    }

	$scope.renderChart = function(){
        if(document.getElementById('categories-chart')==null){
            return;
        }

        var categoryCtx = document.getElementById('categories-chart').getContext('2d');

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

	};

    $scope.randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    $scope.init();

});
