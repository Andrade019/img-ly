'use client';

import { useState } from 'react';
import styles from '../novacores.module.css';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ onSelectProduct }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '½';
    stars += '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
    return stars;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <section id="produtos" className={styles.productsSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Nossos Produtos</h2>
          <p className={styles.sectionSubtitle}>
            Escolha o produto perfeito e personalize do seu jeito
          </p>
        </div>
        <a href="#" className={styles.viewAllLink}>
          Ver todos os produtos →
        </a>
      </div>

      <div className={styles.categoryTabs}>
        <button 
          className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          🏷️ Todos
        </button>
        {CATEGORIES.map(category => (
          <button 
            key={category.id}
            className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <article 
            key={product.id} 
            className={styles.productCard}
            onClick={() => onSelectProduct(product)}
          >
            <div className={styles.productImageWrapper}>
              <img 
                src={product.thumbnailUrl} 
                alt={product.label}
                className={styles.productImage}
              />
              {product.featured && (
                <span className={styles.productBadge}>Destaque</span>
              )}
              <button 
                className={styles.productWishlist}
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implementar wishlist
                }}
              >
                ♡
              </button>
            </div>
            
            <div className={styles.productInfo}>
              <div className={styles.productCategory}>
                {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
              </div>
              <h3 className={styles.productName}>{product.label}</h3>
              
              {product.rating && (
                <div className={styles.productRating}>
                  <span className={styles.stars}>{renderStars(product.rating)}</span>
                  <span className={styles.ratingText}>
                    {product.rating} ({product.reviewCount} avaliações)
                  </span>
                </div>
              )}
              
              <div className={styles.productPriceRow}>
                <span className={styles.productPrice}>
                  {formatPrice(product.unitPrice)}
                </span>
                <button 
                  className={styles.customizeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                >
                  Personalizar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
