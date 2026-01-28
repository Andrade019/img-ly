'use client';

import styles from '../novacores.module.css';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a href="/novacores" className={styles.logo}>
          <div className={styles.logoIcon}>🎨</div>
          <div className={styles.logoText}>
            Nova<span>Cores</span>
          </div>
        </a>

        <nav className={styles.nav}>
          <a href="#produtos" className={styles.navLink}>Produtos</a>
          <a href="#categorias" className={styles.navLink}>Categorias</a>
          <a href="#como-funciona" className={styles.navLink}>Como Funciona</a>
          <a href="#sobre" className={styles.navLink}>Sobre Nós</a>
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Buscar produtos..." />
          </div>
          
          <button className={styles.cartButton} onClick={onCartClick}>
            <span className={styles.cartIcon}>🛒</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          
          <button className={styles.userButton}>
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
