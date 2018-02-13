var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})

.service('DataService', function ($http) {

    var DataService = {};
    DataService.helpers = {};
    DataService.categories = DataService.categories || [];
    DataService.locations = DataService.locations || [];
    DataService.employees = DataService.employees || [];
    DataService.shifts = DataService.shifts || [];
    DataService.jobs = DataService.jobs || [];

    DataService.init = function(){
    	DataService.helpers.getCategories();
		DataService.helpers.getEmployees();
		DataService.helpers.getLocations();
		DataService.helpers.getShifts();
    };

	DataService.helpers.getCategories = function(){

		var config = {};
		config.method = 'get';
		config.url = '/basecategories';
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			DataService.categories = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getEmployees = function(){

		var config = {};
		config.method = 'get';
		config.url= '/employees';
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {
			
			DataService.employees = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getLocations = function(){

		var config = {};
		config.method = 'get';
		config.url= '/locations';
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			DataService.locations = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getShifts = function(){

		var config = {};
		config.method = 'get';
		config.url = '/shifts';
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			DataService.shifts = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getJobs = function(){

		var config = {};
		config.method = 'get';
		config.url = '/jobs';
		config.headers = {
			'Accept':'application/json',
			'Content-Type':'application/json',
		};

		$http(config).then(function successCallback(response) {

			DataService.jobs = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getCategoryById = function(id){

		if (typeof DataService.categories == 'undefined'){
			return false;
		}

		for (var i = DataService.categories.length - 1; i >= 0; i--) {
			if (DataService.categories[i].id = id){
				return DataService.categories[i];
			}
		}

	};

	DataService.helpers.getLocationById = function(id){

		if (typeof DataService.locations == 'undefined'){
			return false;
		}

		for (var i = DataService.locations.length - 1; i >= 0; i--) {
			if (DataService.locations[i].id = id){
				return DataService.locations[i];
			}
		}

	};

	DataService.helpers.getEmployeeById = function(id){

		if (typeof DataService.employees == 'undefined'){
			return false;
		}

		for (var i = DataService.employees.length - 1; i >= 0; i--) {
			if (DataService.employees[i].id = id){
				return DataService.employees[i];
			}
		}

	};

	DataService.init();

    return DataService;

})

.controller('MainController', function(DataService) {

	var main =  this;

	main.init = function(){
		main.data = DataService;
		console.log('main controller',main);
	}

	main.init();

});
