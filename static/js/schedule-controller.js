var app = app || angular.module('circusApp', []);

app.controller('ScheduleController', function($scope, DataService) {

	$scope.init = function(){

		$scope.data = DataService;

		$scope.today = moment();
		$scope.from = moment().subtract(7, 'days');
		$scope.to = moment().add(7, 'days');

		$scope.setDefaultDates();
	}

	$scope.setDefaultDates = function(){
		$('#schedule-from-date').val($scope.renderDate($scope.from, 'YYYY-MM-DD'));
		$('#schedule-to-date').val($scope.renderDate($scope.to, 'YYYY-MM-DD'));
	};

	$scope.getTimeframe = function(){
		$scope.from = $('#schedule-from-date').val();
		$scope.to = $('#schedule-to-date').val();
	};

	$scope.updateTimesheet = function(){
		$scope.getTimeframe();
		$scope.data.helpers.getShifts();
	};




	$scope.updateShift = function(shift){

		console.log(shift);

		var config = {};
		config.method = 'post';
		config.url = $scope.timesheetUrl + '/' + shift.shift_id;
		config.body = shift;

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


	$scope.renderDate = function(date, format){
		if (date instanceof moment){
			return date.format(format);			
		} else {
			return moment(date).format(format);			
		}
	};

	$scope.getMomentValueOf = function(date){
		return moment(date).valueOf();
	};

	$scope.momentValueSort = function(shift){
		return moment(shift.date).valueOf();
	};

	$scope.isBetweenDates = function(shift){
		return shift.date > $scope.from && shift.date < $scope.to;
	}

	$scope.init();

});