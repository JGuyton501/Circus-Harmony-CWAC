var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('DashboardController', function($scope, $http) {

    $scope.init = function(){
        $scope.renderChart();
    }

    $scope.renderChart = function(){

        var ctx = document.getElementById('overview').getContext('2d');


        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [0, 10, 5, 2, 20, 30, 45],
                    backgroundColor: ['red','green','blue','yellow','orange','pink'],
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
                responsive: true
            }
        };

        var chart = new Chart(ctx, config);

    };

    $scope.init();


});

