import { gql } from '@apollo/client';
import { GetStaticProps } from 'next';
import ApolloClient from 'client';
import Product from 'components/Product';
import styles from 'styles/Home.module.css';
import ProductsClasses from 'styles/products.module.css';
import { Category, Products } from 'types';

const QUERY = gql`
  query Categories {
    categories {
      name
      products {
        name
        id
        inStock
        gallery
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
const CategoryNamesQuery = gql`
  query Categories {
    categories {
      name
    }
  }
`;
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
    query: CategoryNamesQuery,
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
    query: QUERY,
    variables: { cid: context?.params?.cid },
  });
  const productsInCategory = query.data?.categories.filter(
    (cat: Category) => cat.name === context?.params?.cid
  )[0].products;
  return { props: { products: productsInCategory, cid: context?.params?.cid } };
};
export default CategoryPage;
