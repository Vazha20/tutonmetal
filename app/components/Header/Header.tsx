'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Search from '../Search/Search';




export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);


  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLogin = () => setLoginOpen(!loginOpen);

  return (
    <>
      <header>
        <div className={`${styles.desktop_only} ${styles.container}`}>

        <div>
          <Link href="/">
            <img className={styles.logo} src="/logo.jpeg"/>
          </Link>
        </div>
  
        <div className={styles.flex}>
          <Link href="/">მთავარი</Link>
          <Link href="/about">ჩვენ შესახებ</Link>
          <Link href="/about">პროდუქტი</Link>
          <Link href="/about">გალერეა</Link>
          <Link href="/contact">კონტაქტი</Link>
          <Search />
        </div>
        </div>


        <div className={`${styles.mobileHeader} ${styles.container}`}>
          <div className={styles.burger} onClick={toggleMenu}>
            <MenuOutlined style={{ fontSize: '24px' }} />
          </div>

          <div className={styles.mobileLogo}>
           <Link href="/">
            <img className={styles.logo} src="/logo.jpeg"/>
          </Link>
          </div>

          <Search />

     
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <div className={styles.flextwo}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <span className={styles.logo}>TUTONMETAL</span>
          </Link>
          <div className={styles.burger} onClick={toggleMenu}>
            {menuOpen && <CloseOutlined style={{ fontSize: '24px' }} />}
          </div>
        </div>

        <Link href="/" onClick={() => setMenuOpen(false)}>
          მთავარი
        </Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>
          ჩვენ შესახებ
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          პროდუქტი
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          გალერეა
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          კონტაქტი
        </Link>
      </div>


      <hr />
    </>
  );
}