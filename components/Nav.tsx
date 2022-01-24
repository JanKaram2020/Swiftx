import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styles from 'styles/nav.module.css';

const CurrencyChanger = dynamic(() => import('components/CurrencyChanger'), {
  ssr: false,
});
const Cart = dynamic(() => import('components/Cart'), {
  ssr: false,
});

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element => {
  const { asPath } = useRouter();
  const ariaCurrent = href === asPath ? 'page' : undefined;

  return (
    <Link href={href}>
      <a aria-current={ariaCurrent}>{children}</a>
    </Link>
  );
};
const Nav = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/category/clothes">clothes</NavLink>
      </li>
      <li>
        <NavLink href="/category/tech">tech</NavLink>
      </li>
    </ul>
    <Link href="/">
      <a>
        <Image
          src="/logo.png"
          width="40px"
          height="40px"
          className={styles.cursor}
        />
      </a>
    </Link>
    <ul className={styles.end}>
      <li>
        <CurrencyChanger />
      </li>
      <li>
        <Cart />
      </li>
    </ul>
  </nav>
);

export default Nav;
