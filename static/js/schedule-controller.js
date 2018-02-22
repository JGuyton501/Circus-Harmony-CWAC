var app = app || angular.module('circusApp', []);

app.controller('ScheduleController', function($scope, DataService) {

	$scope.init = function(){
		$scope.data = DataService;
		$scope.nextShift = null;
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

		var isCurrent = $scope.getMomentValueOf(shift.date) > moment().startOf('day')
				&& $scope.getMomentValueOf(shift.date) < moment().endOf('day');

		if (isCurrent&&$scope.nextShift==null){
			$scope.nextShift = shift.shift_id;
		}

		return isCurrent;
	};
	$scope.isFuture = function(shift){
		var isFuture =  $scope.getMomentValueOf(shift.date) > moment().endOf('day');

		if (isFuture&&$scope.nextShift==null){
			$scope.nextShift = shift.shift_id;
		}

		return isFuture;
	};

	$scope.scrollToNext = function(){
		var yOffset = $('#next').offset().top;
		window.scrollTo(0, yOffset-100);
		return null;
	};

	$scope.getShiftDuration = function(shift){
		var ms = moment(shift.end_time).diff(moment(shift.start_time));
		var d = moment.duration(ms);
		var hours = d.hours();
		var minutes = d.minutes();

		if (hours > 0){
			return hours + "h " +minutes + "m";
		} else {
			return minutes + " m";
		}
	};

	$scope.init();
});