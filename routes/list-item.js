const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	BucketList = mongoose.model('BucketList'),
	Activity = mongoose.model('Activity');

router.post('/create', (req, res) => {
	const {activitySlug, name, address, description, hours, phone, website}  = req.body;
	const activityItem = {name, address, description, hours, phone, website};
	console.log("made it here");
	console.log(activityItem);
//Look back and see how information is flowing into bucketlist item.
	Activity.findOneAndUpdate({slug:activitySlug}, {activityItem}, (err, activities, count) => {
    console.log(err);
		res.redirect(`/activities/${activitySlug}`);
	});
});

router.post('/check', (req, res) => {
	console.log("made it to check");
	const {activitySlug} = req.body;
	console.log(req.body, "made it to req.body");
	Activity.findOne({slug:activitySlug}, (err, activities, count) => {
    console.log(`information: ${activities}`);


		//if (activities?.includes(activities[i].name)) {
		//		activities[i].checked = true;
		//	}
		//activities.markModified('information');
		activities.save((err, savedActivity, count) => {
      console.log(err);
			res.redirect(`/activities/${activitySlug}`);
		});
	});
});

module.exports = router;
