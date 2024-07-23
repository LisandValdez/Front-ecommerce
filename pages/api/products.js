import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/products";



export default async function handler(req, res) {
    await mongooseConnect();
    const { category } = req.query;
    let filter = {};

    if (category) {
        const parentCategory = await Category.findById(category);

        if (parentCategory) {
            const childCategories = await getAllChildCategories(parentCategory._id);
            const categoryIds = [parentCategory._id, ...childCategories.map(c => c._id)];

            filter.category = { $in: categoryIds };
        } else {
            filter.category = { $in: [] };
        }
    }

    const products = await Product.find(filter, null, { sort: { '_id': -1 } });
    res.status(200).json(products);
}

async function getAllChildCategories(parentId) {
    const categories = await Category.find({ parent: parentId });
    let childCategories = [...categories];

    for (const category of categories) {
        const children = await getAllChildCategories(category._id);
        childCategories = childCategories.concat(children);
    }

    return childCategories;
}
