import { gql } from '@apollo/client';

const ALL_PRODUCT_IDS = gql`
  query ProductsId {
    category {
      products {
        id
      }
    }
  }
`;
export default ALL_PRODUCT_IDS;
