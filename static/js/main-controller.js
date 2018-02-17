var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})



.directive("employeeSelect", function() {
	var employee = this;
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/employee.html\'"></div>',
        require: 'ngModel',
		link : function(employee, element, attrs, ngModelCtrl){
		    employee.updateEmployee = function(employeeModel) {
		        ngModelCtrl.$setViewValue(employeeModel);
		    }
		}
    };
})

.directive("jobSelect", function() {
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/job.html\'"></div>',
        require: 'ngModel',
		link : function(scope, element, attrs, ngModelCtrl){
		    scope.updateModel = function(ngModel) {
		        ngModelCtrl.$setViewValue(ngModel);
		    }
		}
    };
})

.directive("locationSelect", function() {
	var location = this;
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/location.html\'"></div>',
        require: 'ngModel',
		link : function(location, element, attrs, ngModelCtrl){
		    location.updateLocation = function(locationModel) {
		        ngModelCtrl.$setViewValue(locationModel);
		    }
		}
    };
})

.directive("categorySelect", function() {
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/category.html\'"></div>',
        require: 'ngModel',
		link : function(scope, element, attrs, ngModelCtrl){
		    scope.updateModel = function(ngModel) {
		        ngModelCtrl.$setViewValue(ngModel);
		    }
		}
    };
})


.controller('MainController', function(DataService, $sce, $templateRequest, $scope, $compile) {

	var main = this;

	main.init = function(){
		main.data = DataService;
		main.uri = CIRCUS.uri;
		console.log('main controller',main);
	};

	main.init();

    main.open = function(page){

		var pages = []
		pages["addShift"] = main.uri + "static/ui/addShift.html";
		pages["addEmployee"] = main.uri + "static/ui/addEmployee.html";
		pages["addCategory"] = main.uri + "static/ui/addCategory.html";
		pages["addCategoryGrouping"] = main.uri + "static/ui/addCategoryGrouping.html";
		pages["addJob"] = main.uri + "static/ui/addJob.html";
		pages["addLocation"] = main.uri + "static/ui/addLocation.html";
		pages["deleteEmployee"] = main.uri + "static/ui/deleteEmployee.html";
		pages["deleteLocation"] = main.uri + "static/ui/deleteLocation.html";

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
