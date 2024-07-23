import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { useRouter } from "next/router";


export default function CategoryComponent({categories}) {
    const router = useRouter();
    const {category} = router.query;

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        router.push({
            pathname: '/',
            query: selectedCategory ? { category: selectedCategory } : {},
        });
    };

    return (
        <div>
            <select onChange={handleCategoryChange} value={category || ''}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
}


export async function getServerSideProps() {
    await mongooseConnect();

    const categories = await Category.find({});
    return{
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
