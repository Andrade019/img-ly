'use client';

import styles from '../novacores.module.css';

const testimonials = [
  {
    name: 'Marina Silva',
    role: 'Empreendedora',
    initials: 'MS',
    rating: 5,
    text: 'Simplesmente incrível! Consegui criar camisetas personalizadas para minha loja em minutos. A qualidade da impressão superou minhas expectativas.'
  },
  {
    name: 'Carlos Eduardo',
    role: 'Designer Gráfico',
    initials: 'CE',
    rating: 5,
    text: 'Como designer, sou exigente com qualidade. A NovaCores entrega exatamente o que eu crio no editor. Cores fiéis e acabamento impecável.'
  },
  {
    name: 'Ana Paula',
    role: 'Organizadora de Eventos',
    initials: 'AP',
    rating: 5,
    text: 'Já fiz vários pedidos para eventos corporativos. Sempre entregam no prazo e a qualidade é consistente. Meus clientes adoram!'
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.testimonialsSectionTitle}>
        O que nossos clientes dizem
      </h2>
      
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.testimonialStars}>
              {'★'.repeat(testimonial.rating)}
            </div>
            <p className={styles.testimonialText}>
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}>
                {testimonial.initials}
              </div>
              <div>
                <div className={styles.testimonialName}>{testimonial.name}</div>
                <div className={styles.testimonialRole}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
