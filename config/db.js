const mongoose=require('mongoose')


const connectDb =async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`mongodb database running on port`)
}

module.exports=connectDb;