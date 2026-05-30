const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:String,
    qty:String,
    price:Number
})

const productModel=mongoose.model("products",productSchema)

module.exports={productModel}