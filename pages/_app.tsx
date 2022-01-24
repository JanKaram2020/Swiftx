import 'styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import client from 'client';
import Layout from 'components/Layout';
import { saveState } from 'helpers/local-storage';
import store from 'store';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
store.subscribe(() => saveState(store.getState()));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
