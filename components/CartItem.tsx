import { useQuery } from '@apollo/client';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { changeOption, decrementQuantity, incrementQuantity } from 'store/cart';
import { CartItem as CartItemInterface } from 'types/cartStore';
import styles from 'styles/cartItem.module.css';
import { Product } from 'types';
import SINGLE_PRODUCT_QUERY from 'queries/SINGLE_PRODUCT_QUERY';

const CartItem = ({ item }: { item: CartItemInterface }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currency = useSelector((state: RootState) => state.currency.value);
  const { data, loading } = useQuery<{ product: Product }>(
    SINGLE_PRODUCT_QUERY,
    {
      variables: { pid: item.id },
    }
  );
  const price = data?.product.prices.filter(
    (pr) => pr.currency.symbol === currency
  )[0];
  if (loading) return <p>.......loading</p>;
  const changeOptionHandler = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    const newOptions = item.options.map((x: string) => x);
    newOptions[index] = value;
    dispatch(changeOption({ id: item.id, options: item.options, newOptions }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p> {data?.product.name}</p>
        <p>
          {currency}
          {price?.amount}
        </p>
        {data?.product.attributes.map((at, i) => (
          <div key={at.id}>
            <p>{at.name}</p>
            <div className={styles.buttons}>
              {at.items.map((it) => (
                <button
                  type="button"
                  className={
                    it.value === item.options[i] ? styles.choose : styles.normal
                  }
                  key={it.id}
                  onClick={() =>
                    changeOptionHandler({ index: i, value: it.value })
                  }
                >
                  {it.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        <div className={styles.quantity}>
          <button
            className={styles.button}
            type="button"
            onClick={() =>
              dispatch(
                incrementQuantity({ id: item.id, options: item.options })
              )
            }
          >
            +
          </button>
          <p>{item.quantity}</p>
          <button
            className={styles.button}
            type="button"
            onClick={() =>
              dispatch(
                decrementQuantity({ id: item.id, options: item.options })
              )
            }
          >
            -
          </button>
        </div>
        {data?.product?.gallery[0] ? (
          <Image
            src={data.product.gallery[0]}
            width="105"
            height="137"
            objectFit="cover"
          />
        ) : null}
      </div>
    </div>
  );
};

export default CartItem;
