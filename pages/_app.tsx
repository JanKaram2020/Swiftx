import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from 'client';
import styles from 'styles/container.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
