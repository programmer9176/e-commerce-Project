import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";


export const CreateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ success: false, message: "Name is required" });
        }

        const existCategory = await CategoryModel.findOne({ name });


        if (existCategory) {
            return res.json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save();

        if (!category) {
            return res.json({
                success: false,
                message: "Failed to create category"
            });
        }

        return res.json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
