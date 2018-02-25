var app = app || angular.module('circusApp', []);

app

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
	var job = this;
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/job.html\'"></div>',
        require: 'ngModel',
		link : function(job, element, attrs, ngModelCtrl){
		    job.updateJob = function(jobModel) {
		        ngModelCtrl.$setViewValue(jobModel);
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
	var category = this;
    return {
        template : '<div ng-include src="main.uri + \'static/ui/components/category.html\'"></div>',
        require: 'ngModel',
		link : function(category, element, attrs, ngModelCtrl){
		    category.updateCategory = function(categoryModel) {
		        ngModelCtrl.$setViewValue(categoryModel);
		    }
		}
    };
})

;