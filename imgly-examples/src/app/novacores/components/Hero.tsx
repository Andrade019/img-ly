'use client';

import styles from '../novacores.module.css';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span>✨</span>
            Tecnologia de ponta em impressão
          </div>
          
          <h1 className={styles.heroTitle}>
            Crie produtos <span>únicos</span> com sua marca
          </h1>
          
          <p className={styles.heroDescription}>
            Personalize camisetas, canecas, banners e muito mais em tempo real. 
            Qualidade profissional de gráfica digital com a facilidade de um editor intuitivo.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={scrollToProducts}>
              Começar a Criar
              <span>→</span>
            </button>
            <button className={styles.btnSecondary}>
              <span>▶</span>
              Ver como funciona
            </button>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>50K+</div>
              <div className={styles.statLabel}>Clientes Satisfeitos</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>100K+</div>
              <div className={styles.statLabel}>Produtos Criados</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>4.9★</div>
              <div className={styles.statLabel}>Avaliação Média</div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/cases/product-editor-ui/tshirt/thumbnail.png" 
              alt="Produto personalizado" 
              className={styles.heroImage}
            />
            
            <div className={styles.floatingCard}>
              <div className={`${styles.floatingIcon} ${styles.purple}`}>🎨</div>
              <div className={styles.floatingText}>
                <h4>Editor em tempo real</h4>
                <p>Visualize suas criações</p>
              </div>
            </div>
            
            <div className={styles.floatingCard}>
              <div className={`${styles.floatingIcon} ${styles.cyan}`}>⚡</div>
              <div className={styles.floatingText}>
                <h4>Entrega rápida</h4>
                <p>Em até 5 dias úteis</p>
              </div>
            </div>
            
            <div className={styles.floatingCard}>
              <div className={`${styles.floatingIcon} ${styles.amber}`}>✓</div>
              <div className={styles.floatingText}>
                <h4>Qualidade garantida</h4>
                <p>Satisfação ou reembolso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
