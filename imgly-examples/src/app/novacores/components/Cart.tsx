'use client';

import { useEffect } from 'react';
import styles from '../novacores.module.css';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
}

export default function Cart({ items, onClose, onRemove, onUpdateQuantity }: CartProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const total = items.reduce((acc, item) => acc + item.product.unitPrice * item.quantity, 0);

  const getColorLabel = (item: CartItem) => {
    const color = item.product.colors.find(c => c.id === item.color);
    return color?.label || item.color;
  };

  const getSizeLabel = (item: CartItem) => {
    const size = item.product.sizes.find(s => s.id === item.size);
    return size?.label || item.size;
  };

  return (
    <>
      <div className={styles.cartOverlay} onClick={onClose} />
      <div className={styles.cartSidebar}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Seu Carrinho ({items.length})</h2>
          <button className={styles.cartCloseBtn} onClick={onClose}>✕</button>
        </div>
        
        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <div className={styles.cartEmpty}>
              <div className={styles.cartEmptyIcon}>🛒</div>
              <p>Seu carrinho está vazio</p>
              <p>Adicione produtos incríveis!</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img 
                  src={item.product.thumbnailUrl} 
                  alt={item.product.label}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemInfo}>
                  <h4 className={styles.cartItemName}>{item.product.label}</h4>
                  <p className={styles.cartItemDetails}>
                    {getColorLabel(item)} • {getSizeLabel(item)}
                  </p>
                  <span className={styles.cartItemPrice}>
                    {formatPrice(item.product.unitPrice * item.quantity)}
                  </span>
                </div>
                <div className={styles.cartItemActions}>
                  <button 
                    className={styles.cartItemRemove}
                    onClick={() => onRemove(index)}
                  >
                    🗑️
                  </button>
                  <div className={styles.cartItemQuantity}>
                    <button onClick={() => onUpdateQuantity(index, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span className={styles.cartTotalLabel}>Total</span>
              <span className={styles.cartTotalValue}>{formatPrice(total)}</span>
            </div>
            <button className={styles.checkoutButton}>
              Finalizar Compra →
            </button>
            <button className={styles.continueShoppingBtn} onClick={onClose}>
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
