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
		console.log('main.data: ', main.data);
	};

	main.init();

    main.open = function(page){

		var pages = []
		pages["addShift"] = main.uri + "static/ui/addShift.html";
		pages["scheduleView"] = main.uri + "static/ui/schedulePopup.html";
		pages["admin/addShift"] = main.uri + "static/ui/admin/addShift.html";
		pages["admin/addEmployee"] = main.uri + "static/ui/admin/addEmployee.html";
		pages["admin/addCategory"] = main.uri + "static/ui/admin/addCategory.html";
		pages["admin/addCategoryGrouping"] = main.uri + "static/ui/admin/addGrouping.html";
		pages["admin/addJob"] = main.uri + "static/ui/admin/addJob.html";
		pages["admin/addLocation"] = main.uri + "static/ui/admin/addLocation.html";
		pages["admin/deleteEmployee"] = main.uri + "static/ui/admin/deleteEmployee.html";
		pages["admin/deleteLocation"] = main.uri + "static/ui/admin/deleteLocation.html";
		pages["admin/deleteJob"] = main.uri + "static/ui/admin/deleteJob.html";
		pages["admin/deleteCategory"] = main.uri + "static/ui/admin/deleteCategory.html";

		if (!pages[page]){
			DataService.utils.displayMessage({
				"title": "Error",
				"content": "There request page does not exist."
			});
			return;
		}

		main.currentUI = pages[page];

		var largeUIArray = ["scheduleView"];
		if (largeUIArray.indexOf(page)!==-1){ 
			main.currentUISize = "large";
		} else {
			main.currentUISize = "normal";
		}

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
