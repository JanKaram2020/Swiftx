import ApolloClient from 'client';
import Product from 'components/Product';
import styles from 'styles/Home.module.css';
import ProductsClasses from 'styles/products.module.css';
import type { Products } from 'types';
import ALL_PRODUCTS_QUERY from 'queries/ALL_PRODUCTS_QUERY';
import SEO from 'components/SEO';

interface HomePageProps {
  loading: boolean;
  data: { category: { products: Products } };
}
const Home: ({ loading, data }: HomePageProps) => JSX.Element = ({
  loading,
  data,
}: HomePageProps) => {
  if (loading) return <h1>loading..........</h1>;
  return (
    <>
      <SEO />
      <main>
        <h1 className={styles.title}>Welcome to Swiftx store</h1>
        <div className={ProductsClasses.products}>
          {data?.category.products.map((pr) => (
            <Product product={pr} key={pr.id} />
          ))}
        </div>
      </main>
    </>
  );
};
export async function getStaticProps() {
  const query = await ApolloClient.query({ query: ALL_PRODUCTS_QUERY });
  return { props: query };
}
export default Home;
