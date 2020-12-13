const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 5);
        const camp = new Campground({
            geometry: {
                type: "Point",
                coordinates:[
                 cities[random1000].longitude,
                 cities[random1000].latitude,
                ]
            },
            author: '5fd150870ae89a1f1cd16cfe',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'camp camp camp  ',
            price,
            images: [
                {

                    url: 'https://res.cloudinary.com/dx0cd7wkw/image/upload/v1607892071/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_mg7ycs.jpg',
                    filename: 'YelpCamp/hspvok2kp5fsfchojz6u'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})