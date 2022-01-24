import { gql } from '@apollo/client';

const SINGLE_PRODUCT_QUERY = gql`
  query product($pid: String!) {
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
export default SINGLE_PRODUCT_QUERY;
