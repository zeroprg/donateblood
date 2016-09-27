Meteor.publish("donor", function(donorId) {
	return Donors.find({_id:donorId}, {});
});

Meteor.publish("donors", function() {
	return Donors.find({}, {});
});

Meteor.publish("donors_empty", function() {
	return Donors.find({_id:null}, {});
});

