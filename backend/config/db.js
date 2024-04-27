//Connection file to mongo db
const mongoose =require( "mongoose");


const connectDB = async () => {
  try {
    const conn=await mongoose.connect("mongodb+srv://swetha:swetha@cluster0.g6dtfzx.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      
    });
    console.log(`MongoDB Connected:${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
   
  }
};

module.exports=connectDB