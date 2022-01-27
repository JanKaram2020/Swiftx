import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApolloClient from 'client';
import { RootState } from 'store';
import { addToCart, openCart } from 'store/cart';
import styles from 'styles/productPage.module.css';
import { Product } from 'types';
import SINGLE_PRODUCT_QUERY from 'queries/SINGLE_PRODUCT_QUERY';
import ALL_PRODUCT_IDS from 'queries/ALL_PRODUCT_IDS';
import SEO from 'components/SEO';

interface ProductPageProps {
  data: { product: Product };
  loading: boolean;
}
const ProductPage = ({ loading, data }: ProductPageProps): JSX.Element => {
  const dispatch = useDispatch();
  const [imageNumber, setImageNumber] = useState(0);
  const currency = useSelector((state: RootState) => state.currency.value);
  const price = data?.product.prices.filter(
    (pr) => pr.currency.symbol === currency
  )[0];
  const gallery = data?.product.gallery;
  const attributes = data.product.attributes.map((atr) => atr.id);
  if (loading) return <h3>loading.........</h3>;

  // @ts-ignore
  return (
    <>
      <SEO
        title={`${data.product.name} | Swiftx`}
        description={data.product.description}
        image={data.product.gallery[0]}
        keywords={data.product.description}
      />
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          {gallery?.map((pic, i) => (
            <button
              aria-label={`image number ${i}`}
              style={{ backgroundImage: `url(${pic})` }}
              key={pic}
              type="button"
              onClick={() => setImageNumber(i)}
              data-image={pic}
            />
          ))}
        </div>
        {gallery ? (
          <div className={styles.image}>
            <Image
              alt={data.product.name}
              src={gallery[imageNumber]}
              width="500px"
              height="500px"
              objectFit="cover"
            />
          </div>
        ) : null}
        <form
          className={styles.content}
          onSubmit={(e) => {
            e.preventDefault();
            const options: any[] = [];
            attributes.forEach((at) => {
              options.push(e.currentTarget[at].value);
            });
            dispatch(addToCart({ id: data.product.id, options }));
            dispatch(openCart());
          }}
        >
          <h2>{data?.product.name}</h2>
          {data?.product.attributes.map((atr) => (
            <div key={atr.id} className={styles.attribute}>
              <h3>{atr.name}</h3>
              <div className={styles.buttons}>
                {atr.items.map((item) => (
                  <div key={item.id}>
                    <input
                      type="radio"
                      name={atr.name}
                      id={`${item.id} ${atr.name}`}
                      value={item.value}
                      required
                    />
                    <label
                      htmlFor={`${item.id} ${atr.name}`}
                      className={`${styles.sizeButton}`}
                    >
                      {item.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.column}>
            <h3>Price</h3>
            <p>
              {price?.amount} {currency}
            </p>
            <button type="submit" className={styles.addToCart}>
              Add to cart
            </button>
          </div>
          {data?.product?.description ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data.product.description }}
            />
          ) : null}
        </form>
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const { data } = await ApolloClient.query({
    query: ALL_PRODUCT_IDS,
  });
  const paths = data.category.products.map((pr: Product) => ({
    params: { pid: pr.id },
  }));
  return {
    paths,
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  const query = await ApolloClient.query({
    query: SINGLE_PRODUCT_QUERY,
    variables: { pid: context?.params?.pid },
  });
  return { props: query };
};

export default ProductPage;
