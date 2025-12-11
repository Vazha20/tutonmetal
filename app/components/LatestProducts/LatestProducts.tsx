'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { message } from 'antd';
import './LatestProducts.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  mainImage?: string;
  created_at?: string;
}

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, category, main_image, created_at')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;

        setLatestProducts(
          (data || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category,
            mainImage: p.main_image
              ? p.main_image.startsWith('http')
                ? p.main_image
                : `${supabaseUrl}/storage/v1/object/public/products/${p.main_image}`
              : '/placeholder.png',
            created_at: p.created_at,
          }))
        );
      } catch (err) {
        console.error('ბოლო პროდუქტების ჩატვირთვა ვერ მოხერხდა', err);
        message.error('ბოლო პროდუქტების ჩატვირთვა ვერ მოხერხდა');
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  const isNewProduct = (created_at?: string) => {
    if (!created_at) return false;
    const diffDays = (Date.now() - new Date(created_at).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const loaderArray = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <div style={{ width: '100%', maxWidth: 1320, margin: '0 auto', padding: '20px' }}>
      <style>{`
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
          border-radius: 12px;
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>

      <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>🛍️ ბოლოს დამატებული</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {loading
          ? loaderArray.map((_, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '16px',
                  padding: '20px',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div className="shimmer" style={{ height: '220px', marginBottom: 15 }} />
                <div className="shimmer" style={{ height: '20px', width: '60%', marginBottom: 10 }} />
                <div className="shimmer" style={{ height: '18px', width: '40%' }} />
              </div>
            ))
          : latestProducts.length > 0
          ? latestProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '350px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
                  }}
                >
                  <div>
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'contain',
                        borderRadius: '12px',
      
                        marginBottom: '15px',
                      }}
                    />
                    {isNewProduct(product.created_at) && (
                      <div
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -12,
                          background: '#000',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        ახალი
                      </div>
                    )}
                    <h3
                      style={{
                        marginBottom: '10px',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111',
                        lineHeight: '1.2em',
                      }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <strong
                    style={{
                      fontSize: '16px',
                      color: '#000',
                      textAlign: 'right',
                    }}
                  >
                    {product.price} ₾
                  </strong>
                </div>
              </Link>
            ))
          : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
              <p>პროდუქტები არ არის ხელმისაწვდომი</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default LatestProducts;
