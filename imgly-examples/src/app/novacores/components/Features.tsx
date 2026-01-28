'use client';

import styles from '../novacores.module.css';

const features = [
  {
    icon: '🎨',
    title: 'Editor Profissional',
    description: 'Editor intuitivo e poderoso para criar designs incríveis. Adicione textos, imagens, formas e muito mais.'
  },
  {
    icon: '👁️',
    title: 'Preview em Tempo Real',
    description: 'Visualize exatamente como seu produto ficará antes de finalizar o pedido. Sem surpresas.'
  },
  {
    icon: '🖨️',
    title: 'Impressão de Alta Qualidade',
    description: 'Tecnologia de impressão digital de última geração para cores vibrantes e duradouras.'
  },
  {
    icon: '🚚',
    title: 'Entrega Rápida',
    description: 'Produzimos e enviamos seu pedido em até 5 dias úteis para todo o Brasil.'
  },
  {
    icon: '💰',
    title: 'Preços Competitivos',
    description: 'Qualidade profissional com preços acessíveis. Descontos especiais para pedidos em quantidade.'
  },
  {
    icon: '🛡️',
    title: 'Garantia de Satisfação',
    description: 'Se não ficar satisfeito com a qualidade, devolvemos seu dinheiro. Simples assim.'
  }
];

export default function Features() {
  return (
    <section id="como-funciona" className={styles.featuresSection}>
      <div className={styles.featuresContent}>
        <h2 className={styles.featuresSectionTitle}>
          Por que escolher a NovaCores?
        </h2>
        <p className={styles.featuresSectionSubtitle}>
          Tecnologia de ponta combinada com qualidade artesanal
        </p>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
