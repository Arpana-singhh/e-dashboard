const express=require('express');
const cors = require("cors")
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app =express();

app.use(express.json()); 
app.use(cors());

app.get("/signup", (req, res)=>{
    res.send("api in progress...");
})

// SignUp Api
app.post("/register", async(req, res)=>{
    let user = new User(req.body);
    let result = await user.save();
     result=result.toObject();
     delete result.password
    res.send(result); 
})

// Login Api
app.post('/login', async(req, res)=>{
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select("-password");
        if(user){
          res.send(user)
        }
        else{
            res.send({result:"No User Found"})
        }
    }
})

// Add Product Api
app.post('/add-product', async(req, res)=>{
   let product= new Product(req.body);
   let result = await product.save();
   res.send(result)
})


// Product Listing 
app.get('/products', async(req, res)=>{
    const products=await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({products: "No Products found"}) 
    }
    
})

app.listen(5000)