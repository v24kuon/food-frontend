import React, { useContext } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Nav, NavItem } from 'reactstrap';
import AppContext from '../context/AppContext';

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>ショッピングサイト</title>
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css' />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className='navbar navbar-dark bg-dark'>
          <div className='container-fluid'>
            <NavItem>
              <Link href='/'>
                <a className='navbar-brand'>ホーム</a>
              </Link>
            </NavItem>
            <NavItem className='ms-auto'>
              {user ? (
                <Link href='/'>
                  <a
                    className='nav-link'
                    onClick={() => {
                      setUser(null);
                    }}
                  >
                    ログアウト
                  </a>
                </Link>
              ) : (
                <Link href='/login'>
                  <a className='nav-link'>ログイン</a>
                </Link>
              )}
            </NavItem>
            <NavItem>
              {user ? (
                <h5 className='nav-link' style={{ color: 'white', marginBottom: 0 }}>
                  {user.username}
                </h5>
              ) : (
                <Link href='/register'>
                  <a className='nav-link'>新規登録</a>
                </Link>
              )}
            </NavItem>
          </div>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
