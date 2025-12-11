'use client';

import Link from 'next/link';
import styles from './BottomNav.module.css';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';



export default function BottomNav() {
  const [loginOpen, setLoginOpen] = useState(false);


  const toggleLogin = () => setLoginOpen(!loginOpen);

  return (
    <>
      <nav className={styles.bottomNav}>
        <Link href="/" className={styles.navItem}>
          <HomeOutlined style={{ fontSize: '20px' }} />
          <span>მთავარი</span>
        </Link>

        <Link href="/products" className={styles.navItem}>
          <AppstoreOutlined style={{ fontSize: '20px' }} />
          <span>კატეგორიები</span>
        </Link>

      
      </nav>

   
    </>
  );
}
