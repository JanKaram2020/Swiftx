import { gql } from '@apollo/client';

const ALL_PRODUCTS_QUERY = gql`
  query Categories {
    category {
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
export default ALL_PRODUCTS_QUERY;
