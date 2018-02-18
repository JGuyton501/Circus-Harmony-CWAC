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
    		"url": CIRCUS.uri + url,
    		"method": method,
    		"headers": headers
    	};
    };

    DataService.utils.displayMessage = function(message){

		DataService.utils.message = {};
		DataService.utils.message.title = message.title || null;
		DataService.utils.message.content = message.content || "";
		DataService.utils.message.action = message.action || "Close";

		$('#update-modal').modal('hide');
		$('#message').modal({
			keyboard: false,
			focus: true
		});

	};

    /* Getters */

	DataService.helpers.getBaseCategories = function(){

		var config = DataService.utils.getConfig('baseCategories', 'get');

		$http(config).then(function successCallback(response) {

			DataService.baseCategories = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting base categories."
			});
		}); 

	};

	DataService.helpers.getCategories = function(){

		//var config = DataService.utils.getConfig('/categories', 'get');
		var config = DataService.utils.getConfig('baseCategories', 'get');

		$http(config).then(function successCallback(response) {

			DataService.categories = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting categories."
			});
		}); 

	};

	DataService.helpers.getEmployees = function(){

		var config = DataService.utils.getConfig('employees', 'get');

		$http(config).then(function successCallback(response) {
			
			DataService.employees = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting employees."
			});
		}); 

	};

	DataService.helpers.getLocations = function(){

		var config = DataService.utils.getConfig('locations', 'get');

		$http(config).then(function successCallback(response) {

			DataService.locations = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting locations."
			});
		}); 

	};

	DataService.helpers.getShifts = function(){

		var config = DataService.utils.getConfig('shifts', 'get');

		$http(config).then(function successCallback(response) {

			DataService.shifts = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting shifts."
			});
		}); 

	};

	DataService.helpers.getJobs = function(){

		var config = DataService.utils.getConfig('jobs', 'get');

		$http(config).then(function successCallback(response) {

			DataService.jobs = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting jobs."
			});
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

		var config = DataService.utils.getConfig('addBaseCategory', 'post');
		config.data = baseCategory;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getBaseCategories();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding base category."
			});

		}); 

	};

	DataService.helpers.addCategory = function(category){

		var config = DataService.utils.getConfig('addCategory', 'post');
		config.data = category;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getCategories();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding category."
			});

		}); 

	};

	DataService.helpers.addEmployee = function(employee){

		var config = DataService.utils.getConfig('addEmployee', 'post');
		config.data = employee;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getEmployees();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding employee."
			});

		}); 

	};

	DataService.helpers.addJob = function(job){

		var config = DataService.utils.getConfig('addJob', 'post');
		config.data = job;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getJobs();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding job."
			});

		}); 

	};

	DataService.helpers.addLocation = function(location){

		var config = DataService.utils.getConfig('addLocation', 'post');
		config.data = location;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getLocations();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding location."
			});

		}); 

	};

	DataService.helpers.addShift = function(shift){

		var config = DataService.utils.getConfig('addShift', 'post');
		config.data = shift;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getShifts();

		}, function errorCallback(response) {

			console.log(response)

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding shift."
			});

		}); 

	};


	DataService.init();

    return DataService;

});