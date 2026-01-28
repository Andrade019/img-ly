'use client';

import styles from '../novacores.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>🎨</div>
              <span>NovaCores</span>
            </div>
            <p className={styles.footerDescription}>
              Transformando ideias em produtos únicos desde 2020. 
              Qualidade profissional de gráfica digital ao alcance de todos.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>📘</a>
              <a href="#" className={styles.socialLink}>📸</a>
              <a href="#" className={styles.socialLink}>🐦</a>
              <a href="#" className={styles.socialLink}>💼</a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h4>Produtos</h4>
            <ul>
              <li><a href="#">Camisetas</a></li>
              <li><a href="#">Moletons</a></li>
              <li><a href="#">Canecas</a></li>
              <li><a href="#">Banners</a></li>
              <li><a href="#">Adesivos</a></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Parcerias</a></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Prazo de Entrega</a></li>
              <li><a href="#">Política de Troca</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            © 2026 NovaCores. Todos os direitos reservados.
          </div>
          <div className={styles.footerPayments}>
            <span className={styles.paymentIcon}>💳 Visa</span>
            <span className={styles.paymentIcon}>💳 Master</span>
            <span className={styles.paymentIcon}>📱 Pix</span>
            <span className={styles.paymentIcon}>🏦 Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
