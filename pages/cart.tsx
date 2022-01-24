import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from 'components/CartItem';
import useTotal from 'helpers/useTotal';
import { RootState } from 'store';
import styles from 'styles/cart.module.css';

const Cart = () => {
  const total = useTotal();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  return (
    <div className={styles.relative}>
      <div
        style={{
          width: '100%',
          display: 'grid',
          gap: '30px',
          fontSize: '22px',
        }}
      >
        <h3>My Bag, {cartItems.length} items</h3>
        {cartItems.map((item) => (
          <CartItem
            key={`${item.id} ${JSON.stringify(item.options)}`}
            item={item}
          />
        ))}
        <div className={styles.totalSection}>
          <p>Total</p>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
