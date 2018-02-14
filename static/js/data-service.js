var app = app || angular.module('circusApp', []);

app.service('DataService', function ($http) {

    var DataService = {};
    DataService.helpers = {};
    DataService.utils = {};
    DataService.categories = DataService.categories || [];
    DataService.locations = DataService.locations || [];
    DataService.employees = DataService.employees || [];
    DataService.shifts = DataService.shifts || [];
    DataService.jobs = DataService.jobs || [];

    DataService.init = function(){
    	DataService.helpers.getBaseCategories();
    	DataService.helpers.getCategories();
		DataService.helpers.getEmployees();
		DataService.helpers.getLocations();
		DataService.helpers.getShifts();
		DataService.helpers.getJobs();
    };

    /* Utilities */

    DataService.utils.getConfig = function(url, method, headers){
    	var headers = headers || {
			"Accept":"application/json",
			"Content-Type":"application/json",
		};
    	return {
    		"url": url,
    		"method": method,
    		"headers": headers
    	};
    };

    /* Getters */

	DataService.helpers.getBaseCategories = function(){

		var config = DataService.utils.getConfig('/baseCategories', 'get');

		$http(config).then(function successCallback(response) {

			DataService.baseCategories = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getCategories = function(){

		/* this route is broken for me, i think my db needs to be updated */
		//var config = DataService.utils.getConfig('/categories', 'get');
		var config = DataService.utils.getConfig('/baseCategories', 'get');

		$http(config).then(function successCallback(response) {

			DataService.categories = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getEmployees = function(){

		var config = DataService.utils.getConfig('/employees', 'get');

		$http(config).then(function successCallback(response) {
			
			DataService.employees = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getLocations = function(){

		var config = DataService.utils.getConfig('/locations', 'get');

		$http(config).then(function successCallback(response) {

			DataService.locations = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getShifts = function(){

		var config = DataService.utils.getConfig('/shifts', 'get');

		$http(config).then(function successCallback(response) {

			DataService.shifts = response.data;

		}, function errorCallback(response) {
			console.log('error',response);
		}); 

	};

	DataService.helpers.getJobs = function(){

		var config = DataService.utils.getConfig('/jobs', 'get');

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


	/* Setters */

	DataService.helpers.addBaseCategory = function(baseCategory){

		var config = DataService.utils.getConfig('/addBaseCategory', 'post');
		config.data = baseCategory;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	DataService.helpers.addCategory = function(category){

		var config = DataService.utils.getConfig('/addCategory', 'post');
		config.data = category;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	DataService.helpers.addEmployee = function(employee){

		var config = DataService.utils.getConfig('/addEmployee', 'post');
		config.data = employee;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	DataService.helpers.addJob = function(job){

		var config = DataService.utils.getConfig('/addJob', 'post');
		config.data = job;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	DataService.helpers.addLocation = function(location){

		var config = DataService.utils.getConfig('/addLocation', 'post');
		config.data = location;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};

	DataService.helpers.addShift = function(shift){

		var config = DataService.utils.getConfig('/addShift', 'post');
		config.data = shift;

		$http(config).then(function successCallback(response) {

			console.log(response);

		}, function errorCallback(response) {
			console.log(response);
		}); 

	};


	DataService.init();

    return DataService;

});