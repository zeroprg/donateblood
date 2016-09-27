this.HomePrivateDonorsDetailsController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateDonorsDetails': { to: 'HomePrivateSubcontent'}
		
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
			Meteor.subscribe("donor", this.params.donorId)
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
			donor: Donors.findOne({_id:this.params.donorId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});