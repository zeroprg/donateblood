this.Donors = new Mongo.Collection("donors");

this.Donors.userCanInsert = function(userId, doc) {
	return true;
};

this.Donors.userCanUpdate = function(userId, doc) {
	return true;
};

this.Donors.userCanRemove = function(userId, doc) {
	return true;
};
