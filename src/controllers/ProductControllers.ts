import { string } from "zod";
import { ProductsModel } from "../bd/products";

// CRUD (create, get, update, delete)

export const createProduct = (values: Record<string, any>) =>
    new ProductsModel(values).save().then((product) => product.toObject());

export const getAllProducts = () => ProductsModel.find();

export const getProductByName = (productName: String) =>
    ProductsModel.findOne({
        productName: productName,
    });

