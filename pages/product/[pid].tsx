import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { Product } from 'types';
import { useState } from 'react';
import styles from 'styles/productPage.module.css';
import Image from 'next/image';

const QUERY = gql`
  query Product($pid: String!) {
    product(id: $pid) {
      name
      id
      inStock
      gallery
      description
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
`;

const Post: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data, loading, error } = useQuery<{ product: Product }>(QUERY, {
    variables: { pid },
  });
  const [imageNumber, setImageNumber] = useState(0);
  const sign = '$';
  const price = data?.product.prices.filter(
    (pr) => pr.currency.symbol === sign
  )[0];
  const gallery = data?.product.gallery;
  console.log(data);
  const mod = JSON.parse(JSON.stringify({ ...data }));
  if (loading) return <h3>loading.........</h3>;
  if (error) return <h3>error...........</h3>;

  return (
    <div className={styles.container}>
      <div className={styles.imageColumn}>
        {gallery?.map((pic, i) => (
          <button key={pic} type="button" onClick={() => setImageNumber(i)}>
            <Image src={pic} width="80px" height="80px" objectFit="cover" />
          </button>
        ))}
      </div>
      {gallery ? (
        <div className={styles.image}>
          <Image
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
          const formData = new FormData(e.currentTarget);
          console.log('id', pid);
          let i = 0;
          // @ts-ignore
          for (const p of formData) {
            const name = p[0];
            const value = p[1];
            mod.product.attributes[i].currentValue = value;
            i += 1;
            console.log(name, value);
          }
          console.log(mod);
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
                    value={item.id}
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
            {price?.amount} {sign}
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
  );
};

export default Post;
