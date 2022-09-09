const express=require("express");
const { deleteProduct, getProductDetails, createProduct, updateProduct } = require("../controllers/postController");
const {isAuthenticatedUser} = require("../middleware/auth");

const router=express.Router();


router.get("/posts/:id",getProductDetails);
router.post("/posts",isAuthenticatedUser ,createProduct);
router.delete("/posts/:id",isAuthenticatedUser,deleteProduct);
router.put("/posts/:id",isAuthenticatedUser,updateProduct);


module.exports=router;