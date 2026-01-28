import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NovaCores - Gráfica Digital Profissional',
  description: 'Marketplace de gráfica digital com personalização em tempo real. Crie produtos únicos com qualidade profissional.'
};

export default function NovaCoreslayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
