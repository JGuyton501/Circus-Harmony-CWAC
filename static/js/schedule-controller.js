var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('ScheduleController', function($scope, $http) {

	$scope.init = function(){

		$scope.timesheetUrl = '/shifts';

		$scope.timesheet = null;
		$scope.today = moment();
		$scope.from = moment().subtract(7, 'days');
		$scope.to = moment().add(7, 'days');

		$scope.setDefaultDates();
		$scope.getTimesheet();

		$scope.getCategories();
		$scope.getLocations();

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
		config.url = $scope.timesheetUrl + '?from='+$scope.from+'&to='+$scope.to;

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

	$scope.momentValueSort = function(item){
		return moment(item.date).valueOf();
	};


	$scope.isBetweenDates = function(shift){
		return shift.date > $scope.from && shift.date < $scope.to;
	}




	$scope.categories = null;


	$scope.getCategories = function(){

		var config = {};
		config.method = 'get';
		config.url= '/basecategories';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log(response);
			$scope.categories = response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};






	$scope.findCategoryById = function(id){

		if ($scope.categories == null){
			return false;
		}

		for (var i = $scope.categories.length - 1; i >= 0; i--) {

			if ($scope.categories[i].id = id){
				return $scope.categories[i];
			}

		}

	};






	$scope.locations = null;


	$scope.getLocations = function(){

		var config = {};
		config.method = 'get';
		config.url= '/locations';

		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			console.log("got locations");
			console.log(response);
			$scope.locations= response.data;


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	$scope.findLocationById = function(id){

		if ($scope.locations == null){
			return false;
		}

		for (var i = $scope.locations.length - 1; i >= 0; i--) {

			if ($scope.locations[i].id = id){
				return $scope.locations[i];
			}

		}

	};



	$scope.init();


});