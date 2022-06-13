const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	BucketList = mongoose.model('BucketList');
	Activity = mongoose.model('Activity');
	User = mongoose.model('User');

const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
}

router.use(isAuthenticated)

router.get('/', (req, res) => {
	BucketList.find({user: req.user ? req.user._id : undefined}, (err, bucketlist, count) => {
		res.render('bucketlist-all.hbs', {bucketlist:bucketlist});
	});
});

router.get('/create', (req, res) => {
	console.log(req.body);
  res.render('bucketlist-create.hbs');	
});

router.post('/create', (req, res) => {
	const {listname} = req.body;
	//console.log(req.body);
	new BucketList({
    user: req.user._id,
		listname: listname,
		createdAt: Date.now()
	}).save((err, bucketlist, count) => {
		if(err){
			console.log(err);
		}
		console.log(bucketlist);
		User.findOneAndUpdate({_id: bucketlist.user}, {$push: {bucketlist: bucketlist._id}}, (err, user, count) => {
			console.log("bucket list id is updated");
		});

		console.log(err);
		console.log(bucketlist);
		res.redirect(`/bucketlist/`);
	});
/*
	new Activity({
		name,
		address,
		description,
		hours,
		phone,
		website

	}).save((err, bucketlist, count) => {
		console.log(err);
		console.log(activities);
		res.redirect(`/activities`);
	});
	*/
});

router.post('/activityadd', (req, res) => {
	console.log(req.body);
	Activity.find({slug: req.body.Activity}, (err, activities, count) => {
		console.log(activities);
		const activity_ids = activities.map(activity => new Promise((resolve, reject) => {
			
			BucketList.findOneAndUpdate({slug: req.body.bucketlist}, {$push: {activities: activity._id}}, (err, bucketlist, count) => {
				console.log(bucketlist);
				resolve(bucketlist);
			});
		}));
		Promise.all(activity_ids).then((bucketlist) => {
			console.log('done', bucketlist);
			res.redirect(`/bucketlist/${bucketlist[0].slug}`);
		});
	});
});
router.get('/:slug', (req, res) => {
	const {slug} = req.params;
	BucketList.findOne({slug}).populate('activities').exec((err, bucketlist, count) => {
		console.log("made it to this", bucketlist);
		if(err){
			console.log(err);
		}
		console.log(bucketlist);
		if(bucketlist === null){
			res.render('bucketlist-all.hbs');
		}
		else{
			res.render('bucketlist-slug.hbs', {bucketlist, displayBucketListItems:bucketlist.activities.length >= 1});
		}
	});
});

module.exports = router;
