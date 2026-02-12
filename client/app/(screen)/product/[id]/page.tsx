import ProductDetails from "./components/ProductDetails";
import Recommendation from "./components/Recommendation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <ProductDetails id={id} />
      <Recommendation id={id} />
    </>
  );
};

export default Page;
