var app = app || angular.module('circusApp', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[').endSymbol(']}');
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




    /* Schedule */

	main.getTimeframe = function(){
		var scheduleScope = angular.element($("#schedule")).scope();
		scheduleScope.from = scheduleScope.getMomentValueOf( $('#schedule-from-date').val() );
		scheduleScope.to = scheduleScope.getMomentValueOf ( $('#schedule-to-date').val() );
	};

	main.updateScheduleView = function(){
		main.data.shifts = [];
		main.data.helpers.getShifts();
		main.getTimeframe();



		/*
		DataService.utils.displayMessage({
			"title": "Success",
			"content": "Updated Range"
		});
		*/
	};

});
