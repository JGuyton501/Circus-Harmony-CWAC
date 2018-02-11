var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})
.controller('NotificationController', function($scope, $http) {

	$scope.init = function(){
		$scope.notifications = [];
		$scope.notifications.push(
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"ed libero libero"},
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"Nulla eu imperdiet est"},
{"message":"Etiam congue suscipit nulla ac interdum. Praesent sollicitudin gravida lorem at viverra. ",
"header":"Praesent sollicitudin"},
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"Nulla eu imperdiet est"},
{"message":"Etiam congue suscipit nulla ac interdum. Praesent sollicitudin gravida lorem at viverra. ",
"header":"Praesent sollicitudin"},
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"ed libero libero"},
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"Nulla eu imperdiet est"},
{"message":"Etiam congue suscipit nulla ac interdum. Praesent sollicitudin gravida lorem at viverra. ",
"header":"Praesent sollicitudin"},
{"message":"Cras fringilla nunc eget urna sodales, sit amet fermentum arcu varius. Sed libero libero, blandit quis libero eget, vulputate vulputate mi.",
"header":"Nulla eu imperdiet est"},
{"message":"Etiam congue suscipit nulla ac interdum. Praesent sollicitudin gravida lorem at viverra. ",
"header":"Praesent sollicitudin"}
			);
	}



	$scope.init();


});