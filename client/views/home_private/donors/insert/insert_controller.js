this.HomePrivateDonorsInsertController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateDonorsInsert': { to: 'HomePrivateSubcontent'}
		
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
			Meteor.subscribe("donors_empty")
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
			donors_empty: Donors.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});