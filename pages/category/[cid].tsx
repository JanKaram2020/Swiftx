import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Categories } from 'types';
import ProductsClasses from 'styles/products.module.css';
import Product from 'components/Product';
import styles from 'styles/Home.module.css';

const CategoryPage = () => {
  const router = useRouter();
  const { cid } = router.query;
  const QUERY = gql`
    query Categories {
      categories {
        name
        products {
          name
          id
          inStock
          gallery
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
  const { data, loading, error } = useQuery<{ categories: Categories }>(QUERY);
  const productsInCategory = data?.categories.filter(
    (cat) => cat.name === cid
  )[0].products;
  if (loading) return <h3>loading.........</h3>;
  if (error) return <h3>error...........</h3>;
  return (
    <>
      <h1 className={styles.title}>{cid}</h1>
      <div className={ProductsClasses.products}>
        {productsInCategory?.map((pr) => (
          <Product product={pr} key={pr.id} />
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
