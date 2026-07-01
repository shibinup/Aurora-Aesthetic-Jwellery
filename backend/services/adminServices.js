import Product from "../model/productSchema.js";
const addProduct = async (req, res) => {
  try {
    
    const { id, name, price, image, description, category, features, } = req.body;

    

    if (!id||!name||!price||!image||!description||!category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const sameId =  await Product.findOne({ id: id });
    if(sameId){
        return res.status(400).json({
            success:false,
            message:"please enter another  id this id already exist"
        })
    }

    const product = new Product({
      id,
      name,
      price,
      image,
      description,
      category,
      features,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {addProduct}