this.HomePrivateDonorsController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateDonors': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("donors")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			donors: Donors.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});