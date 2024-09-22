import ProductModel from "../Models/ProductModel.js";
import fs from 'fs';
import slugify from "slugify";

export const CreateProductController = async (req, res) => {
    try {
        const { name, slug, description, category, price, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation checks
        switch (true) {
            case !name:
                return res.status(400).json({ success: false, message: "Product name is required" });
            case !description:
                return res.status(400).json({ success: false, message: "Product description is required" });
            case !category:
                return res.status(400).json({ success: false, message: "Product category is required" });
            case !price:
                return res.status(400).json({ success: false, message: "Product price is required" });
            case !quantity:
                return res.status(400).json({ success: false, message: "Product quantity is required" });
        }

        // Creating new product with slugified name
        const product = new ProductModel({ ...req.fields, slug: slugify(name) });

        // Handle photo if provided
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        // Save product to database
        await product.save();

        // Return success response
        return res.json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        // Return error response
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


export const GetProductController = async (req, resp) => {
    try {
        const products = await ProductModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 })

        return resp.status(200).json({
            success: true,
            TatalProducts: products.length,
            message: "All Products",
            products,
        });

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const GetSingleProductController = async (req, resp) => {
    try {
        const { slug } = req.params;

        // Fetch the product excluding the photo field
        const singleProduct = await ProductModel.findOne({ slug: slug }).select("-photo");

        if (!singleProduct) {
            return resp.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return resp.status(200).json({
            success: true,
            singleProduct,
        });

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


export const DeleteProductController = async (req, resp) => {
    try {
        const { id } = req.params

        const product = await ProductModel.findByIdAndDelete({ _id: id })

        return resp.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const UpdateProductController = async (req, resp) => {
    try {
        const { name, slug, description, category, price, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return resp.status(400).json({ success: false, message: "Product name is required" });
            case !description:
                return resp.status(400).json({ success: false, message: "Product description is required" });
            case !category:
                return resp.status(400).json({ success: false, message: "Product category is required" });
            case !price:
                return resp.status(400).json({ success: false, message: "Product price is required" });
            case !quantity:
                return resp.status(400).json({ success: false, message: "Product quantity is required" });
        }

        const product = await ProductModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        return resp.json({
            success: true,
            message: "Product updated successfully",
            product
        });


    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const ProductPhotoController = async (req, resp) => {
    try {
        const { id } = req.params

        const product = await ProductModel.findById(id).select("photo");

        if (product.photo.data) {
            resp.set("Content-type", product.photo.contentType);
            resp.send(product.photo.data);
        }

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const filterController = async (req, resp) => {
    try {
        const { checked, radio } = req.body

        let args = {}

        if (checked.length > 0) args.category = checked;

        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const filterProducts = await ProductModel.find(args);

        resp.send({
            success: true,
            filterProducts
        })

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: "Something went wrong in filter",
            error: error.message,
        });
    }
}