const mongoose = require('mongoose');
const mongoURI = process.env.DB_LINK + encodeURIComponent(process.env.DB_PASSWORD) + process.env.DB_SENT;
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
    const fetched_data = await mongoose.connection.db.collection('food_items');
    fetched_data.find({}).toArray(async function (err,data) {
      const foodCategory = await mongoose.connection.db.collection('foodCategory');
      foodCategory.find({}).toArray(function(err,catData){

        if (err) console.log(err);
        else{
          global.food_items = data;
          global.foodCategory = catData;
        }
      })

      // if (err) console.log(err);
      // else{
      //   global.food_items = data;
      // }
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongoDB;



// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:' + encodeURIComponent('Kankitpkb@513') + '@cluster0.fdcbxfq.mongodb.net/gofoodmern?retryWrites=true&w=majority';
// const mongoDB = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log('connected');
//     });
// }
// module.exports = mongoDB;
