import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import styles from './Navbar.module.scss';

export type NavbarProps = {};

const API_URL = '/api/users/currentuser';

async function fetcher(url: string) {
  const { data } = await axios.get(url);

  return data;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { data, error } = useSWR(API_URL, fetcher);

  const links = [
    !data?.currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !data?.currentUser && { label: 'Sign In', href: '/auth/signin' },
    data?.currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(Boolean)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logo}>
          <Link href="/">
            <a>Zeon</a>
          </Link>
        </li>
        {links}
      </ul>
    </nav>
  );
};

export default Navbar;
