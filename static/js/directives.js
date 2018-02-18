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

;