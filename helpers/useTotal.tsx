import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { RootState } from 'store';
import { Category } from 'types';

const AllProductsQuery = gql`
  query Categories {
    category {
      products {
        id
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
const useTotal = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { data } = useQuery<{ category: Category }>(AllProductsQuery);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartItemsId = cartItems.map((item) => item.id);
  const Products = cartItemsId.map(
    (id) => data?.category.products.filter((pr) => pr.id === id)[0]
  );
  const prices = Products?.map((pr) => pr?.prices);
  const cartPrices = prices
    ?.map((pri) => pri?.filter((pr) => pr.currency.symbol === currency))
    .map((pr) => pr?.map((pri) => pri.amount))
    .flat();
  return cartPrices
    ? `${cartItems // @ts-ignore
        .map((it, i) => it.quantity * cartPrices[i])
        .reduce((total, num) => total + num, 0)} ${currency}`
    : null;
};

export default useTotal;
