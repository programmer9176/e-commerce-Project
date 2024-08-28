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
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};


export const AllCategoryController = async (req, resp) => {
    try {
        const categories = await CategoryModel.find({});
        const totalCategories = categories.length;
        return resp.json({
            success: true,
            totalCategories,
            message: "All category list",
            categories
        })
    } catch (error) {
        console.error(error);
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const SingleCategoryController = async (req, resp) => {
    try {
        const { slug } = req.params;

        const singleCategory = await CategoryModel.findOne({ slug });
        return resp.json({
            success: true,
            message: "Single category",
            singleCategory: singleCategory.name
        });
    } catch (error) {
        console.error(error);
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const UpdateCategoryController = async (req, resp) => {
    try {
        const { id } = req.params;
        const { name } = req.body

        const updateCategory = await CategoryModel.findByIdAndUpdate(id, { slug: slugify(name) }, { new: true });
        return resp.json({
            success: true,
            message: "Updated category",
            updateCategory: updateCategory.name,
            slug: updateCategory.slug
        });
    } catch (error) {
        console.error(error);
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const DeleteCategoryController = async (req, resp) => {
    try {
        const { id } = req.params;

        const deleteCategory = await CategoryModel.findByIdAndDelete(id);

        return resp.json({
            success: true,
            message: "Deleted category",
        });
    } catch (error) {
        console.error(error);
        return resp.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}