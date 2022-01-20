import type { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.css';
import { useQuery, gql } from '@apollo/client';
import type { Categories } from 'types';

const QUERY = gql`
  query Categories {
    categories {
      name
      products {
        name
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery<{ categories: Categories }>(QUERY);
  if (loading) return <h1>loadinggg</h1>;
  if (error) return <h1>{error.toString()}</h1>;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to swiftx</h1>
        <button type="button">Swifttttt</button>

        <p className={styles.description}>
          {JSON.stringify(data?.categories, null, 5)}
        </p>
      </main>
    </>
  );
};

export default Home;
