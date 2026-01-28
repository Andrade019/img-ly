import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor de Personalização | NovaCores',
  description: 'Personalize seu produto em tempo real com nosso editor profissional.'
};

export default function EditorLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
