import Product from "../models/products.js"

export const calculating = async (req,res)=>{
    
    const data = await Product.aggregate([
        {
            $match : {}
        },
        {
            $project : {_id : 0 , name : 1 , brand : 1 , price : 1 , sizes : 1 }
        }
    ])
    console.log(data)

    res.status(200).json({
        data
    })
}
