import NewProducts from "@/components/NewProducts";
import Featured from "@/components/featured";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";


export default function HomePage({featuredProduct,newProducts}){
  
  return(
    <div>
      <Header/>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProduct = await Product.findOne({}, null, {sort: {'_id':-1}});
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:8});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}