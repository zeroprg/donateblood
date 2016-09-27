var pageSession = new ReactiveDict();

Template.HomePrivateDonorsInsert.rendered = function() {
	renderInputFields();
};

Template.HomePrivateDonorsInsert.events({
	
});

Template.HomePrivateDonorsInsert.helpers({
	
});

Template.HomePrivateDonorsInsertInsertForm.rendered = function() {
	

	pageSession.set("homePrivateDonorsInsertInsertFormInfoMessage", "");
	pageSession.set("homePrivateDonorsInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.HomePrivateDonorsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("homePrivateDonorsInsertInsertFormInfoMessage", "");
		pageSession.set("homePrivateDonorsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var homePrivateDonorsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(homePrivateDonorsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("homePrivateDonorsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("home_private.donors", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("homePrivateDonorsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Donors.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("home_private.donors", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.HomePrivateDonorsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("homePrivateDonorsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("homePrivateDonorsInsertInsertFormErrorMessage");
	}
	
});
