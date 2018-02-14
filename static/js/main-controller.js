var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})

.controller('MainController', function(DataService) {

	var main =  this;

	main.init = function(){
		main.data = DataService;
		console.log('main controller',main);
	}

	main.init();

});
