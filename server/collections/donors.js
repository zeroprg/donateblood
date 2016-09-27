Donors.allow({
	insert: function (userId, doc) {
		return Donors.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Donors.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Donors.userCanRemove(userId, doc);
	}
});

Donors.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Donors.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Donors.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Donors.before.remove(function(userId, doc) {
	
});

Donors.after.insert(function(userId, doc) {
	
});

Donors.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Donors.after.remove(function(userId, doc) {
	
});
