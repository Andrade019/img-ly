'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../novacores.module.css';
import { Product, CartItem } from '../types';
import { CATEGORIES } from '../data';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(
    product.colors.find(c => c.isDefault)?.id || product.colors[0].id
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].id);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCustomize = () => {
    // Navegar para o editor com os parâmetros do produto
    router.push(`/novacores/editor?product=${product.id}&color=${selectedColor}`);
  };

  const handleAddToCart = () => {
    onAddToCart({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
      totalPrice: product.unitPrice * quantity
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  };

  // Gerar URL do preview baseado na cor selecionada
  const getPreviewUrl = () => {
    const area = product.areas[0];
    if (area?.mockup?.images?.[0]?.uri) {
      return area.mockup.images[0].uri.replace('{{color}}', selectedColor);
    }
    return product.thumbnailUrl;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        
        <div className={styles.modalPreview}>
          <img 
            src={getPreviewUrl()} 
            alt={product.label}
            className={styles.modalPreviewImage}
          />
        </div>
        
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{product.label}</h2>
          <div className={styles.modalCategory}>
            {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
          </div>
          
          {product.rating && (
            <div className={styles.modalRating}>
              <span className={styles.stars}>{renderStars(product.rating)}</span>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviewCount} avaliações)
              </span>
            </div>
          )}
          
          <p className={styles.modalDescription}>{product.description}</p>
          
          <div className={styles.modalPrice}>
            {formatPrice(product.unitPrice * quantity)}
          </div>
          
          <div className={styles.modalSection}>
            <h4 className={styles.modalSectionTitle}>Cor</h4>
            <div className={styles.colorOptions}>
              {product.colors.map(color => (
                <button
                  key={color.id}
                  className={`${styles.colorOption} ${selectedColor === color.id ? styles.active : ''}`}
                  style={{ backgroundColor: color.colorHex }}
                  onClick={() => setSelectedColor(color.id)}
                  title={color.label}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.modalSection}>
            <h4 className={styles.modalSectionTitle}>Tamanho</h4>
            <div className={styles.sizeOptions}>
              {product.sizes.map(size => (
                <button
                  key={size.id}
                  className={`${styles.sizeOption} ${selectedSize === size.id ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.modalSection}>
            <h4 className={styles.modalSectionTitle}>Quantidade</h4>
            <div className={styles.quantitySelector}>
              <button 
                className={styles.quantityBtn}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button 
                className={styles.quantityBtn}
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className={styles.modalActions}>
            <button className={styles.customizeButton} onClick={handleCustomize}>
              🎨 Personalizar no Editor
            </button>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              🛒 Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
