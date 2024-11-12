const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async() => {
	
	await client.connect();
	const database = client.db('giftapp');

	const gifts = database.collection('gifts');
	const users = database.collection('users');
	const invoices = database.collection('invoices');
	const purchasedAndReceivedGifts = database.collection('purchasedAndReceivedGifts');



	await gifts.deleteMany({});
	await users.deleteMany({});
	await invoices.deleteMany({});
	await purchasedAndReceivedGifts.deleteMany({});


	await gifts.insertMany([{
		giftId: 'giftid1',
		name: 'Delicious Cake',
		image: 'gift-delicious-cake.png',
		price: 0.05,
		purchased: 0,
		total: 30,
		currency: 'usdt',
		color: '#FE9F4133'
	}, {
		giftId: 'giftid2',
		name: 'Green Star',
		image: 'gift-green-star.png',
		price: 5,
		purchased: 0,
		total: 3000,
		currency: 'ton',
		color: '#46D10033'
	}, {
		giftId: 'giftid3',
		name: 'Blue Star',
		image: 'gift-blue-star.png',
		price: 0.01,
		purchased: 0,
		total: 5000,
		currency: 'eth',
		color: '#007AFF33'
	}, {
		giftId: 'giftid4',
		name: 'Red Star',
		image: 'gift-red-star.png',
		price: 10,
		purchased: 10000,
		total: 10000,
		currency: 'usdt',
		color: '#FF47470D'
	}]);
	


	console.info(await gifts.find({}).toArray())
	
    await client.close();
	
})();