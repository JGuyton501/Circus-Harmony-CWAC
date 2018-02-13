var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('DashboardController', function($scope, DataService) {

    $scope.init = function(){
        $scope.data = DataService;
        $scope.renderChart();
    }

    $scope.renderChart = function(){

        var ctx = document.getElementById('overview-chart').getContext('2d');

        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        $scope.randomScalingFactor(),
                        $scope.randomScalingFactor(),
                        $scope.randomScalingFactor(),
                        $scope.randomScalingFactor(),
                        $scope.randomScalingFactor(),
                    ],
                    backgroundColor: [
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'blue',
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    "Red",
                    "Orange",
                    "Yellow",
                    "Green",
                    "Blue"
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            }
        };

        $scope.overviewChart = new Chart(ctx, config);

    };


    $scope.randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    $scope.init();


});

