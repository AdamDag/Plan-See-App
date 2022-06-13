const express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Activity = mongoose.model('Activity');
BucketList = mongoose.model('BucketList');

const {NumUtil} = require('../utilities/numUtility');
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
	Activity.find({}, (err, activities, count) => {
		console.log(activities);
		BucketList.find({user: req.user ? req.user._id : undefined}, (err, bucketlist, count) => {
			res.render('activities-all.hbs', {activities, bucketlist});
		});

	});
});

router.get('/create', (req, res) => {
  res.render('activities-create.hbs');
});

router.post('/create', (req, res) => {
	console.log(req.body);
	let { name, address, description, hours, phone, website, indoor, outdoor, winter, summer, spring, fall, yearRound, morning, afternoon, lateNight, twentyFourHr, priceFree, priceCheap, priceModerate, priceExpensive} = req.body;
	
	indoor = indoor === 'present' ? true : false;
	outdoor = outdoor === 'present' ? true : false;
	winter = winter === 'present' ? true : false;
	summer = summer === 'present' ? true : false;
	spring = spring === 'present' ? true : false;
	fall = fall === 'present' ? true : false;	
	yearRound = yearRound === 'present' ? true : false;
	morning = morning === 'present' ? true : false;
	afternoon = afternoon === 'present' ? true : false;
	lateNight = lateNight === 'present' ? true : false;
	twentyFourHr = twentyFourHr === 'present' ? true : false;
	priceFree = priceFree === 'present' ? true : false;
	priceCheap = priceCheap === 'present' ? true : false;
	priceModerate = priceModerate === 'present' ? true : false;
	priceExpensive = priceExpensive === 'present' ? true : false;
	
	console.log(indoor);
	new Activity({
    user: req.user._id,
		
		name, 
		address, 
		description, 
		hours, 
		phone, 
		website, 
		indoor,
		outdoor, 
		winter, 
		summer, 
		spring, 
		fall, 
		yearRound, 
		morning, 
		afternoon, 
		lateNight, 
		twentyFourHr, 
		priceFree, 
		priceCheap, 
		priceModerate, 
		priceExpensive,

		createdAt: Date.now()
	}).save((err, activities, count) => {
		console.log(err);
		console.log(activities);
		res.redirect(`/activities/${activities.slug}`);
	});
});

router.post('/surprise', (req, res) => {
	let {indoor, outdoor, winter, summer, spring, fall, yearRound, morning, afternoon, evening, lateNight, twentyFourHr, priceFree, priceCheap, priceModerate, priceExpensive} = req.body;
	let search = {};
	if(indoor === 'present' && indoor !== undefined){
		search ['indoor'] = { $eq: true };
	}
	if(outdoor === 'present' && outdoor !== undefined){
		search ['outdoor'] = { $eq: true };
	}
	if(winter === 'present' && winter !== undefined){
		search ['winter'] = { $eq: true };
	}
	if(summer === 'present' && summer !== undefined){
		search ['summer'] = { $eq: true };
	}
	if(spring === 'present' && spring !== undefined){
		search ['spring'] = { $eq: true };
	}
	if(fall === 'present' && fall !== undefined){
		search ['fall'] = { $eq: true };
	}
	if(yearRound === 'present' && yearRound !== undefined){
		search ['yearRound'] = { $eq: true };
	}
	if(morning === 'present' && morning !== undefined){
		search ['morning'] = { $eq: true };
	}
	if(afternoon === 'present' && afternoon !== undefined){
		search ['afternoon'] = { $eq: true };
	}
	if(evening === 'present' && evening !== undefined){
		search ['evening'] = { $eq: true };
	}
	if(twentyFourHr === 'present' && twentyFourHr !== undefined){
		search ['twentyFourHr'] = { $eq: true };
	}
	if(lateNight === 'present' && lateNight !== undefined){
		search ['lateNight'] = { $eq: true };
	}
	if(priceFree === 'present' && priceFree !== undefined){
		search ['priceFree'] = { $eq: true };
	}
	if(priceCheap === 'present' && priceCheap !== undefined){
		search ['priceCheap'] = { $eq: true };
	}
	if(priceModerate === 'present' && priceModerate !== undefined){
		search ['priceModerate'] = { $eq: true };
	}
	if(priceExpensive === 'present' && priceExpensive !== undefined){
		search ['priceExpensive'] = { $eq: true };
	}

	Activity.find(search, (err, activities, count) => {
		console.log(activities);
		const numbah = new NumUtil();
		randActivity = activities[numbah.random(activities.length)];
		res.render('surprise.hbs', {randActivity});

	});
});
router.post('/options', (req, res) => {
	let {indoor, outdoor, winter, summer, spring, fall, yearRound, morning, afternoon, evening, lateNight, twentyFourHr, priceFree, priceCheap, priceModerate, priceExpensive} = req.body;
	let search = {};
	if(indoor === 'present' && indoor !== undefined){
		search ['indoor'] = { $eq: true };
	}
	if(outdoor === 'present' && outdoor !== undefined){
		search ['outdoor'] = { $eq: true };
	}
	if(winter === 'present' && winter !== undefined){
		search ['winter'] = { $eq: true };
	}
	if(summer === 'present' && summer !== undefined){
		search ['summer'] = { $eq: true };
	}
	if(spring === 'present' && spring !== undefined){
		search ['spring'] = { $eq: true };
	}
	if(fall === 'present' && fall !== undefined){
		search ['fall'] = { $eq: true };
	}
	if(yearRound === 'present' && yearRound !== undefined){
		search ['yearRound'] = { $eq: true };
	}
	if(morning === 'present' && morning !== undefined){
		search ['morning'] = { $eq: true };
	}
	if(afternoon === 'present' && afternoon !== undefined){
		search ['afternoon'] = { $eq: true };
	}
	if(evening === 'present' && evening !== undefined){
		search ['evening'] = { $eq: true };
	}
	if(twentyFourHr === 'present' && twentyFourHr !== undefined){
		search ['twentyFourHr'] = { $eq: true };
	}
	if(lateNight === 'present' && lateNight !== undefined){
		search ['lateNight'] = { $eq: true };
	}
	if(priceFree === 'present' && priceFree !== undefined){
		search ['priceFree'] = { $eq: true };
	}
	if(priceCheap === 'present' && priceCheap !== undefined){
		search ['priceCheap'] = { $eq: true };
	}
	if(priceModerate === 'present' && priceModerate !== undefined){
		search ['priceModerate'] = { $eq: true };
	}
	if(priceExpensive === 'present' && priceExpensive !== undefined){
		search ['priceExpensive'] = { $eq: true };
	}

	Activity.find(search, (err, activities, count) => {
		console.log(activities);
		res.render('options.hbs', {activities});		

	});

});
router.get('/:slug', (req, res) => {
	const {slug} = req.params;
	console.log(slug, "made it to the slug");
	Activity.findOne({slug}, (err, activities, count) => {
		console.log("made it to activities", activities);
		res.render('activities-slug.hbs', {activities, displayActivityItems:true});
	});
});

module.exports = router;