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


	$scope.updateShift = function(shift){
		DataService.utils.displayMessage({
			"title": "Success",
			"content": shift.shift_id+" was clicked"
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
		return $scope.getMomentValueOf(shift.date) > $scope.from && $scope.getMomentValueOf(shift.date) < $scope.to;
	}




	$scope.isPast = function(shift){
		return $scope.getMomentValueOf(shift.date) < moment().startOf('day');
	};
	$scope.isCurrent = function(shift){
		return $scope.getMomentValueOf(shift.date) > moment().startOf('day')
				&& $scope.getMomentValueOf(shift.date) < moment().endOf('day');
	};
	$scope.isFuture = function(shift){
		return $scope.getMomentValueOf(shift.date) > moment().endOf('day');
	};

	$scope.init();

});