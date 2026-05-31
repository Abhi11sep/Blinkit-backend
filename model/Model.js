const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    src:String,
    title:String,
    qty:String,
    price:Number,
    count:Number,
})

const productModel=mongoose.model("products",productSchema)

module.exports={productModel}