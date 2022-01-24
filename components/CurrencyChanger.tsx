import React, { MouseEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { change } from 'store/currency';
import styles from 'styles/currency.module.css';

const CurrencyChanger = () => {
  const [isOpen, setOpen] = useState(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const dispatch = useDispatch<AppDispatch>();
  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    dispatch(change(e.target.value));
    setOpen(false);
  };
  return (
    <div className={styles.currency}>
      <button
        type="button"
        className={styles.currencyButton}
        onClick={() => setOpen(!isOpen)}
      >
        {currency}
        <svg
          className={`${isOpen ? styles.flip : null}`}
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 0.5L4 3.5L7 0.5"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`${styles.currencyButtons} ${isOpen ? null : styles.hide}`}
      >
        <button type="button" value="$" onClick={clickHandler}>
          $ USD
        </button>
        <button type="button" value="£" onClick={clickHandler}>
          £ GPB
        </button>
        <button type="button" value="A$" onClick={clickHandler}>
          A$ AUD
        </button>
        <button type="button" value="¥" onClick={clickHandler}>
          ¥ JPY
        </button>
        <button type="button" value="₽" onClick={clickHandler}>
          ₽ RUB
        </button>
      </div>
    </div>
  );
};

export default CurrencyChanger;
