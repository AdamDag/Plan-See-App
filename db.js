const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  // 
  bucketlist:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'BucketList' }],
});
// Setting the schema for activity database entries
const Activity = new mongoose.Schema({
	name: {type: String},
	address: {type: String},
	description: {type: String},
	hours: {type: String},
	phone: {type: String},
	website: {type: String},

	indoor:{type: Boolean, default: false}, //boolean,
  	outdoor: {type: Boolean, default: false},// boolean
  	winter:{type: Boolean, default: false},// boolean
  	summer:{type: Boolean, default: false}, // boolean
  	spring:{type: Boolean, default: false}, // boolean
  	fall:{type: Boolean, default: false}, // boolean
  	yearRound:{type: Boolean, default: false}, //boolean
  	morning:{type: Boolean, default: false}, //boolean
  	afternoon:{type: Boolean, default: false}, //boolean
  	evening:{type: Boolean, default: false}, //boolean
  	lateNight:{type: Boolean, default: false}, //boolean
  	twentyFourHr:{type: Boolean, default: false}, //boolean
  	priceFree:{type: Boolean, default: false}, //boolean
  	priceCheap:{type: Boolean, default: false}, //boolean
  	priceModerate:{type: Boolean, default: false},  //boolean
  	priceExpensive:{type: Boolean, default: false}, //boolean
 	//time:{type: Number, default: false}, //<1 hour, 1-2 hours, 2-3 hours, 3+ hours, as long as you want

}, {
	_id: true
});

//Setting the schema for the Bucket list database entries
const BucketList = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  listname: {type: String, required: true},
	createdAt: {type: Date, required: true},
	activities: [{type:mongoose.Schema.Types.ObjectId, ref:'Activity'}],

});


User.plugin(passportLocalMongoose);
Activity.plugin(URLSlugs('name address'));
BucketList.plugin(URLSlugs('listname'));

mongoose.model('User', User);
mongoose.model('BucketList', BucketList);
mongoose.model('Activity', Activity);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true  /*, ssl: true */});
