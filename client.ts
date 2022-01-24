import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const typeDefs = gql`
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE

  type Price {
    currency: Currency!
    amount: Float!
  }

  type Attribute {
    displayValue: String
    value: String
    id: String!
  }

  type AttributeSet {
    id: String!
    name: String
    type: String
    items: [Attribute]
  }

  type Product {
    id: String!
    name: String!
    inStock: Boolean
    gallery: [String]
    description: String!
    category: String!
    attributes: [AttributeSet]
    prices: [Price!]!
    brand: String!
  }

  type Category {
    name: String
    products: [Product]!
  }

  type Currency {
    label: String!
    symbol: String!
  }

  input CategoryInput {
    title: String!
  }

  type Query {
    categories: [Category]
    category(input: CategoryInput): Category
    product(id: String!): Product
    currencies: [Currency]
  }

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  # The \`Upload\` scalar type represents a file upload.
  scalar Upload
`;
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  typeDefs,
});

export default client;
