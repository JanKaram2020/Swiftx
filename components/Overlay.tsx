import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeCart } from 'store/cart';
import styles from 'styles/layout.module.css';

const Overlay = () => {
  const isOpen = useSelector((state: RootState) => state.cart.open);
  const dispatch = useDispatch();
  return (
    <div
      aria-hidden="true"
      className={`${styles.overlay} ${isOpen ? null : styles.hide}`}
      onClick={() => dispatch(closeCart())}
    />
  );
};

export default Overlay;
