var app = app || angular.module('circusApp', []);

app.service('DataService', function ($http, $rootScope) {

    var DataService = {};
    DataService.helpers = {};
    DataService.utils = {};
    DataService.categories = DataService.categories || [];
    DataService.groupings = DataService.groupings || [];
    DataService.locations = DataService.locations || [];
    DataService.employees = DataService.employees || [];
    DataService.jobs = DataService.jobs || [];
    DataService.shifts = DataService.shifts || [];

    DataService.init = function(){
    	DataService.helpers.getCategories();
    	DataService.helpers.getGroupings();
		DataService.helpers.getEmployees();
		DataService.helpers.getLocations();
		DataService.helpers.getJobs();
		DataService.helpers.getShifts();
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

	DataService.helpers.getCategories = function(){

		var config = DataService.utils.getConfig('categories', 'get');

		$http(config).then(function successCallback(response) {
		
			DataService.categories = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting categories."
			});
		}); 

	};

	DataService.helpers.getGroupings = function(){

		var config = DataService.utils.getConfig('groupings', 'get');

		$http(config).then(function successCallback(response) {

			DataService.groupings = response.data;

		}, function errorCallback(response) {
			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error getting groupings."
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
			DataService.helpers.getStatistics();

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
	
	DataService.helpers.getJobById = function(id){

		if (typeof DataService.jobs == 'undefined'){
			return false;
		}

		for (var i = DataService.jobs.length - 1; i >= 0; i--) {
			if (DataService.jobs[i].id = id){
				return DataService.jobs[i];
			}
		}

	};


	/* Setters */

	DataService.helpers.addCategory = function(category){
		var config = DataService.utils.getConfig('addCategory', 'post');
		config.data = category;
console.log('category: ',category);
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

	DataService.helpers.deleteCategory = function(category_id){
		console.log('catid: ', category_id);
		var category=DataService.helpers.getCategoryById(category_id);
		console.log('category: ', category);
		var config = DataService.utils.getConfig('deleteCategory', 'post');
		config.data = category;
		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getJobs();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error deleting category."
			});

		}); 

	};

	DataService.helpers.addGrouping = function(grouping){
		console.log("adding  grouping", grouping);
		var config = DataService.utils.getConfig('addGrouping', 'post');
		config.data = grouping;

		$http(config).then(function successCallback(response) {

			DataService.utils.displayMessage({
				"title": "Success",
				"content": response.data.message
			});

			DataService.helpers.getGroupings();

		}, function errorCallback(response) {

			DataService.utils.displayMessage({
				"title": response.statusText,
				"content": "There was an error adding grouping."
			});

		}); 

	};

	DataService.helpers.addEmployee = function(employee){
		console.log('employee: ', employee);

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

	DataService.helpers.deleteEmployee = function(employee_id){
		var config = DataService.utils.getConfig('deleteEmployee', 'post');
		var employee=DataService.helpers.getEmployeeById(employee_id);
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
				"content": "There was an error deleting an employee."
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
	DataService.helpers.deleteJob = function(job_id){
		console.log('job id: ', job_id);
		var job=DataService.helpers.getJobById(job_id);
		console.log('job: ', job);
		var config = DataService.utils.getConfig('deleteJob', 'post');
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
				"content": "There was an error deleting job."
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

	DataService.helpers.deleteLocation = function(location_id){
		var location=DataService.helpers.getLocationById(location_id);
		var config = DataService.utils.getConfig('deleteLocation', 'post');
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
				"content": "There was an error deleting location."
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





	/* statistics for charts */
    DataService.helpers.getStatistics = function(){

        DataService.statistics = DataService.statistics || {};
        DataService.statistics.categories = DataService.statistics.categories || {};
        DataService.statistics.categories.name = 'categories';
        DataService.statistics.locations = DataService.statistics.locations || {};
        DataService.statistics.locations.name = 'locations';
        DataService.statistics.jobs = DataService.statistics.jobs || {};
        DataService.statistics.jobs.name = 'jobs';

        /* statistics based on shifts */
        for (var i =  DataService.shifts.length - 1; i >= 0; i--) {

            /* category statistics */
            var categoryId = DataService.shifts[i].category_id;
            DataService.statistics.categories[categoryId] = DataService.statistics.categories[categoryId] || {};
            DataService.statistics.categories[categoryId].count = DataService.statistics.categories[categoryId].count || 0;
            DataService.statistics.categories[categoryId].count++;
            
            /* location statistics */
            var locationId = DataService.shifts[i].location;
            DataService.statistics.locations[locationId] = DataService.statistics.locations[locationId] || {};
            DataService.statistics.locations[locationId].count = DataService.statistics.locations[locationId].count || 0;
            DataService.statistics.locations[locationId].count++;
            
            /* job statistics */
            var jobId = DataService.shifts[i].job_id;
            DataService.statistics.jobs[jobId] = DataService.statistics.jobs[jobId] || {};
            DataService.statistics.jobs[jobId].count = DataService.statistics.jobs[jobId].count || 0;
            DataService.statistics.jobs[jobId].count++;
            
        }

        /* category details */
        for (var i =  DataService.categories.length - 1; i >= 0; i--) {

        	var categoryId = DataService.categories[i].category_id;
        	var categoryName = DataService.categories[i].name;
        	DataService.statistics.categories[categoryId] = DataService.statistics.categories[categoryId] || {};
        	DataService.statistics.categories[categoryId].count = DataService.statistics.categories[categoryId].count || 0;
        	DataService.statistics.categories[categoryId].name = categoryName;

        }

        /* location details */
        for (var i =  DataService.locations.length - 1; i >= 0; i--) {

        	var locationId = DataService.locations[i].location_id;
        	var locationName = DataService.locations[i].name;
        	DataService.statistics.locations[locationId] = DataService.statistics.locations[locationId] || {};
        	DataService.statistics.locations[locationId].count = DataService.statistics.locations[locationId].count || 0;
        	DataService.statistics.locations[locationId].name = locationName;

        }

        /* job details */
        for (var i =  DataService.jobs.length - 1; i >= 0; i--) {

        	var jobId = DataService.jobs[i].job_id;
        	var jobName = DataService.jobs[i].name;
        	DataService.statistics.jobs[jobId] = DataService.statistics.jobs[jobId] || {};
        	DataService.statistics.jobs[jobId].count = DataService.statistics.jobs[jobId].count || 0;
        	DataService.statistics.jobs[jobId].name = jobName;

        }

		$rootScope.$broadcast('statistics-loaded');

    };

	DataService.init();

    return DataService;

});