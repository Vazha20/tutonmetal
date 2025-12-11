"use client";

import { useRef, useState, useEffect } from "react";
import { Card } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Cardbox.module.css";

const categories = [
  { id: 1, href: "/products", name: "ყველა კატეგორია", dark: true, icon: <AppstoreOutlined style={{ fontSize: 28 }} /> },
  { id: 2, name: "მეტალი", image: "/oreuli.png" },
  { id: 3, name: "მეტალი", image: "/kaba.png" },
  { id: 4, name: "მეტალი", image: "/sharvali.png" },
  { id: 5, name: "მეტალი", image: "/perangi.png" },
  { id: 6, name: "მეტალი", image: "/kvedabolo.png" },
  { id: 7, name: "მეტალი", image: "/palto.png" },
  { id: 8, name: "მეტალი", image: "/shirt.png" },
  { id: 9, name: "მეტალი", image: "/shirt.png" },
  { id: 10, name: "მეტალი", image: "/shirt.png" },
  { id: 11, name: "მეტალი", image: "/shirt.png" },
];

export default function Cardbox() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const scrollLeft = () => scrollRef.current && (scrollRef.current.scrollLeft -= 300);
  const scrollRight = () => scrollRef.current && (scrollRef.current.scrollLeft += 300);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const container = scrollRef.current;
    handleScroll();
    container?.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${loaded ? styles.loaded : ""}`}>
      {canScrollLeft && (
        <button className={styles.button} onClick={scrollLeft}>{"<"}</button>
      )}

      <div ref={scrollRef} className={styles.scrollContainer}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.slide}>
            {cat.href ? (
              <Link href={cat.href} style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  className={`${styles.card} ${cat.dark ? styles.dark : styles.light}`}
                  style={{ padding: 12 }}
                >
                  <div className={styles.content}>
                    {cat.icon}
                    <p>{cat.name}</p>
                  </div>
                </Card>
              </Link>
            ) : (
              <Card
                hoverable
                className={`${styles.card} ${cat.dark ? styles.dark : styles.light}`}
                style={{ padding: 12 }}
              >
                {cat.image && <img src={cat.image} alt={cat.name} className={styles.image} />}
                <p className={styles.text}>{cat.name}</p>
              </Card>
            )}
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button className={styles.buttontwo} onClick={scrollRight}>{">"}</button>
      )}
    </div>
  );
}
