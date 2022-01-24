import { gql } from '@apollo/client';

export const ALL_CATEGORIES_QUERY = gql`
  query Categories {
    categories {
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
export const ALL_CATEGORY_NAMES_QUERY = gql`
  query Categories {
    categories {
      name
    }
  }
`;
