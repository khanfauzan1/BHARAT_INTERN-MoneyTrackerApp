const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const Transaction = require("./models/Transaction");
dotenv.config();
app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.send("hello");
});
//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected successfully");
  } catch (err) {
    console.log(err);
  }
};

connectDB();
app.post("/api/transaction", async (req, res) => {
      const { name,price} = req.body;
  const transaction = await Transaction.create({ name,price });
  
  res.json(transaction);
});

app.get('/api/transactions',async(req,res)=>{
  const transactions=await Transaction.find();
  res.json(transactions)

})

app.listen(5000, () => {
  console.log("server started on port 5000");
});
