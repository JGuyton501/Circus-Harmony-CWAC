var app = app || angular.module('circusApp', [])
.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('ScheduleController', function($scope, $http) {

	$scope.init = function(){

		$scope.timesheetUrl = 'http://www.json-generator.com/api/json/get/cfnZEWzpFe?indent=2';

		$scope.timesheet = null;
		$scope.today = moment();
		$scope.from = moment().subtract(7, 'days');
		$scope.to = moment().add(7, 'days');

		$scope.setDefaultDates();
		$scope.getTimesheet();

	}

	$scope.setDefaultDates = function(){
		$('#schedule-from-date').val($scope.renderDate($scope.from, 'YYYY-MM-DD'));
		$('#schedule-to-date').val($scope.renderDate($scope.to, 'YYYY-MM-DD'));
	};

	$scope.getTimeframe = function(){
		$scope.from = $('#schedule-from-date').val();
		$scope.to = $('#schedule-to-date').val();
	};

	$scope.getTimesheet = function(){

		$scope.getTimeframe();

		var config = {};
		config.method = 'get';
		config.url = $scope.timesheetUrl + '&from='+$scope.from+'&to='+$scope.to;

		console.log(config.url);

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.timesheet = response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	$scope.updateTimesheet = function(){
		$scope.getTimesheet();
	};


	$scope.renderDate = function(date, format){
		if (date instanceof moment){
			return date.format(format);			
		} else {
			return moment(date).format(format);			
		}
	};

	$scope.init();


});