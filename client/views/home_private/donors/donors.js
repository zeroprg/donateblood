var pageSession = new ReactiveDict();

Template.HomePrivateDonors.rendered = function() {
	
};

Template.HomePrivateDonors.events({
	
});

Template.HomePrivateDonors.helpers({
	
});

var HomePrivateDonorsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomePrivateDonorsViewSearchString");
	var sortBy = pageSession.get("HomePrivateDonorsViewSortBy");
	var sortAscending = pageSession.get("HomePrivateDonorsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["first_name", "last_name", "blood_group", "email", "phone", "note", "ip", "lat", "lng"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var HomePrivateDonorsViewExport = function(cursor, fileType) {
	var data = HomePrivateDonorsViewItems(cursor);
	var exportFields = ["first_name", "last_name", "blood_group", "email", "phone", "note", "ip", "lat", "lng"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.HomePrivateDonorsView.rendered = function() {
	pageSession.set("HomePrivateDonorsViewStyle", "table");
	
};


Template.HomePrivateDonorsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("HomePrivateDonorsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("HomePrivateDonorsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("HomePrivateDonorsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.donors.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		HomePrivateDonorsViewExport(this.donors, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateDonorsViewExport(this.donors, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateDonorsViewExport(this.donors, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateDonorsViewExport(this.donors, "json");
	}

	
});

Template.HomePrivateDonorsView.helpers({

	"insertButtonClass": function() {
		return Donors.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.donors || this.donors.count() == 0;
	},
	"isNotEmpty": function() {
		return this.donors && this.donors.count() > 0;
	},
	"isNotFound": function() {
		return this.donors && pageSession.get("HomePrivateDonorsViewSearchString") && HomePrivateDonorsViewItems(this.donors).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HomePrivateDonorsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HomePrivateDonorsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HomePrivateDonorsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomePrivateDonorsViewStyle") == "gallery";
	}

	
});


Template.HomePrivateDonorsViewTable.rendered = function() {
	
};

Template.HomePrivateDonorsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomePrivateDonorsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomePrivateDonorsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomePrivateDonorsViewSortAscending") || false;
			pageSession.set("HomePrivateDonorsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("HomePrivateDonorsViewSortAscending", true);
		}
	}
});

Template.HomePrivateDonorsViewTable.helpers({
	"tableItems": function() {
		return HomePrivateDonorsViewItems(this.donors);
	}
});


Template.HomePrivateDonorsViewTableItems.rendered = function() {
	
};

Template.HomePrivateDonorsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("home_private.donors.details", {donorId: this._id});

		console.log(" HomePrivateDonorsViewTableItems click td event catched");
		// set this donor active on map : 
		Session.set("selected", this._id);
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Donors.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Donors.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.donors.edit", {donorId: this._id});
		return false;
	}
});

Template.HomePrivateDonorsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Donors.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Donors.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
