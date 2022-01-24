import { GetStaticProps } from 'next';
import ApolloClient from 'client';
import Product from 'components/Product';
import styles from 'styles/Home.module.css';
import ProductsClasses from 'styles/products.module.css';
import { Category, Products } from 'types';
import {
  ALL_CATEGORIES_QUERY,
  ALL_CATEGORY_NAMES_QUERY,
} from 'queries/ALL_CATEGORIES_QUERY';
import SEO from 'components/SEO';

interface CategoryPageInterface {
  products: Products;
  loading: boolean;
  cid: string;
}
const CategoryPage = ({
  products,
  loading,
  cid,
}: CategoryPageInterface): JSX.Element => {
  if (loading) return <h3>loading.........</h3>;
  return (
    <>
      <SEO title={`${cid} | Swiftx`} />
      <h1 className={styles.title}>{cid}</h1>
      <div className={ProductsClasses.products}>
        {products?.map((pr) => (
          <Product product={pr} key={pr.id} />
        ))}
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const { data } = await ApolloClient.query({
    query: ALL_CATEGORY_NAMES_QUERY,
  });
  const paths = data.categories.map((ca: Category) => ({
    params: { cid: ca.name },
  }));
  return {
    paths,
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  const query = await ApolloClient.query({
    query: ALL_CATEGORIES_QUERY,
    variables: { cid: context?.params?.cid },
  });
  const productsInCategory = query.data?.categories.filter(
    (cat: Category) => cat.name === context?.params?.cid
  )[0].products;
  return { props: { products: productsInCategory, cid: context?.params?.cid } };
};
export default CategoryPage;
