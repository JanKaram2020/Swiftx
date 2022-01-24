import Head from 'next/head';
import React from 'react';

const defaults = {
  description: 'Swiftx store is a store where you can buy clothes and techs',
  keywords: 'SWiftx, Online Store, Clothes , Tech',
  title: 'Swiftx',
  image: '/apple-touch-icon.png',
};
function SEO({
  description = defaults.description,
  keywords = defaults.keywords,
  title = defaults.title,
  image = defaults.image,
}: {
  description?: string;
  keywords?: string;
  title?: string;
  image?: string;
}): React.ReactElement {
  return (
    <Head>
      <title>{title}</title>
      <meta name="image" content={image} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <>
        {/* Social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="swiftx" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </>
      <>
        {/* favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </>
    </Head>
  );
}

export default SEO;
