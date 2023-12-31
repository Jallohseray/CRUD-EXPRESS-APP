const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews')

const hairSalonSchema = new Schema({
    title: String,
    image: String,
    price: String,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

hairSalonSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Hairsalon', hairSalonSchema);
      

