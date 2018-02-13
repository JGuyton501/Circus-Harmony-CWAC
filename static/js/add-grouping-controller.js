var app= app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('AddGroupingController', function($scope, $http) {


/* will move this to dataservice and delete this controller */


	$scope.grouping;
	$scope.addGroupingUrl='/addCategory';
	

		$scope.saveGrouping = function(){
			
			console.log('grouping', $scope.grouping);
			var startDate=$scope.grouping.start_date;
			var endDate=$scope.grouping.end_date;
			var category=getScope('CategoryController').category;
			var location=getScope('LocationController').location;
			var job=getScope('JobController').job;
	
			$scope.grouping={
				'job':job,
				'location':location,
				'category':category,
				'start_date':startDate,
				'end_date':endDate

			};

		
			console.log('shift', $scope.grouping);
		var config = {};
		config.method = 'post';
		config.url= $scope.addGroupingUrl; 
		config.data= $scope.grouping;
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
