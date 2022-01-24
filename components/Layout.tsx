import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import Nav from 'components/Nav';
import styles from 'styles/layout.module.css';

const Overlay = dynamic(() => import('components/Overlay'), {
  ssr: false,
});

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <>
    <Nav />
    <div className={styles.layout}>
      {children}
      <Overlay />
    </div>
  </>
);

export default Layout;
