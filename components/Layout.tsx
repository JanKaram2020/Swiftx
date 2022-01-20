import React, { ReactNode } from 'react';
import Nav from 'components/Nav';
import styles from 'styles/layout.module.css';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className={styles.layout}>
    <Nav />
    {children}
  </div>
);

export default Layout;
