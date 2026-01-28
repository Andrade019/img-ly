'use client';

import { useState } from 'react';
import styles from './novacores.module.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import type { Product, CartItem } from './types';

export default function NovaCoresPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === item.product.id && 
             i.color === item.color && 
             i.size === item.size
      );
      
      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += item.quantity;
        return newCart;
      }
      
      return [...prev, item];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity = quantity;
      return newCart;
    });
  };

  return (
    <div className={styles.app}>
      <Header 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <main>
        <Hero />
        <ProductGrid onSelectProduct={setSelectedProduct} />
        <Features />
        <Testimonials />
      </main>
      <Footer />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      
      {isCartOpen && (
        <Cart 
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
}
