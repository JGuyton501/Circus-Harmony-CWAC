var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddShiftController', function($scope, $http) {

/* will move this to dataservice   */

/* need to figure out something better than getScope */

	$scope.shift;
	$scope.addShiftUrl='/addShift';
	

		$scope.saveShift = function(){
			console.log('shift', $scope.shift);
			var date=$scope.shift.date;
			var startTime=$scope.shift.start_time;
			var endTime=$scope.shift.end_time;
			var employee=getScope('EmployeeController').employee;
			var location=getScope('LocationController').location;
			var job=getScope('JobController').job;
	
			$scope.shift={
				'employee_id':employee.id,
				'location':location,
				'job':job,
				'start_time':startTime,
				'end_time':endTime,
				'date':date,
				'complete':false

			};

		
			console.log('shift', $scope.shift);
		var config = {};
		config.method = 'post';
		config.url= $scope.addShiftUrl; 
		config.data= $scope.shift;
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};
		console.log('configurl', config.url);
		console.log('configdata', config.data);
		$http.post(config.url, config.data).then(function successCallback(response) {

			console.log(response);


		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	function getScope(ctrlName){
		var sel='div[ng-controller="'+ctrlName +'"]';
		return angular.element(sel).scope();
	}


});
