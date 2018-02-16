var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})



.directive("employeeSelect", function() {
    return {
        template : '<div ng-include src="main.rootUri + \'static/ui/components/employee.html\'"></div>'
    };
})

.directive("jobSelect", function() {
    return {
        template : '<div ng-include src="main.rootUri + \'static/ui/components/job.html\'"></div>'
    };
})

.directive("locationSelect", function() {
    return {
        template : '<div ng-include src="main.rootUri + \'static/ui/components/location.html\'"></div>'
    };
})


.controller('MainController', function(DataService, $sce, $templateRequest, $scope, $compile) {

	var main = this;

	main.init = function(){
		main.data = DataService;
		main.rootUri = "http://127.0.0.1:5000/";
		console.log('main controller',main);
	};

	main.init();

    main.open = function(page){

		var pages = []
		pages["addShift"] = main.rootUri + "static/ui/addShift.html";
		pages["addEmployee"] = main.rootUri + "static/ui/addEmployee.html";
		pages["addCategory"] = main.rootUri + "static/ui/addCategory.html";
		pages["addCategoryGrouping"] = main.rootUri + "static/ui/addCategoryGrouping.html";
		pages["addJob"] = main.rootUri + "static/ui/addJob.html";
		pages["addLocation"] = main.rootUri + "static/ui/addLocation.html";
		pages["deleteEmployee"] = main.rootUri + "static/ui/deleteEmployee.html";
		pages["deleteLocation"] = main.rootUri + "static/ui/deleteLocation.html";

		if (!pages[page]){
			DataService.utils.displayMessage({
				"title": "Error",
				"content": "There request page does not exist."
			});
			return;
		}

		main.currentUI = pages[page];

		$('#update-modal').modal({
			keyboard: false,
			focus: true
		});

	};


    main.getCurrentUI = function() {
        return main.currentUI;
    };



  	main.test = function(shift){
  		console.log(shift);
  		main.data.helpers.addShift(shift);
  	}

});
