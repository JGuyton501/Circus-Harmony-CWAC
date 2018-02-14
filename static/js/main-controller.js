var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
})

.controller('MainController', function(DataService, $sce, $templateRequest) {

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

		$templateRequest(pages[page]).then(function(template) {

			main.currentUITemplate = template;

			$('#update-modal').modal({
				keyboard: false,
				focus: true
			});

		}, function(){
			DataService.utils.displayMessage({
				"title": "Error",
				"content": "There was an error loading the requested UI."
			});
		});

	};

  	main.getCurrentUITemplate = function(){
  		return $sce.trustAsHtml(main.currentUITemplate);
  	};

});
