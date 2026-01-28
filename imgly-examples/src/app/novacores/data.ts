import { Product, Category } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_URL_HOSTNAME || '';
const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

export const CATEGORIES: Category[] = [
  {
    id: 'vestuario',
    label: 'Vestuário',
    icon: '👕',
    description: 'Camisetas, moletons, bonés e mais'
  },
  {
    id: 'acessorios',
    label: 'Acessórios',
    icon: '🎒',
    description: 'Bolsas, capas de celular e canecas'
  },
  {
    id: 'sinalizacao',
    label: 'Sinalização',
    icon: '🪧',
    description: 'Placas, banners e faixas'
  },
  {
    id: 'papelaria',
    label: 'Papelaria',
    icon: '📇',
    description: 'Cartões, adesivos e flyers'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'tshirt',
    label: 'Camiseta Premium',
    description: 'Camiseta 100% algodão de alta qualidade. Perfeita para personalização com seu design único.',
    category: 'vestuario',
    designUnit: 'Inch',
    unitPrice: 49.90,
    featured: true,
    rating: 4.8,
    reviewCount: 234,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/tshirt/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Frente',
        pageSize: { width: 12, height: 12 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/tshirt/{{color}}_front.png`,
            width: 814,
            height: 947
          }],
          printableAreaPx: { x: 814 / 2 - 360 / 2, y: 947 / 2 - 360 / 2 - 100, width: 360, height: 360 }
        }
      },
      {
        id: 'back',
        label: 'Costas',
        pageSize: { width: 12, height: 12 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/tshirt/{{color}}_back.png`,
            width: 814,
            height: 947
          }],
          printableAreaPx: { x: 814 / 2 - 360 / 2, y: 947 / 2 - 360 / 2 - 100, width: 360, height: 360 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: 'XS', label: 'PP' },
      { id: 'S', label: 'P' },
      { id: 'M', label: 'M' },
      { id: 'L', label: 'G' },
      { id: 'XL', label: 'GG' }
    ]
  },
  {
    id: 'hoodie',
    label: 'Moletom Premium',
    description: 'Moletom confortável com capuz. Ideal para dias frios e looks descontraídos.',
    category: 'vestuario',
    designUnit: 'Inch',
    unitPrice: 129.90,
    featured: true,
    rating: 4.9,
    reviewCount: 156,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/hoodie/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Frente',
        pageSize: { width: 12, height: 12 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/hoodie/{{color}}_front.png`,
            width: 814,
            height: 947
          }],
          printableAreaPx: { x: 814 / 2 - 360 / 2, y: 947 / 2 - 360 / 2 - 100, width: 360, height: 360 }
        }
      },
      {
        id: 'back',
        label: 'Costas',
        pageSize: { width: 12, height: 12 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/hoodie/{{color}}_back.png`,
            width: 814,
            height: 947
          }],
          printableAreaPx: { x: 814 / 2 - 360 / 2, y: 947 / 2 - 360 / 2 - 100, width: 360, height: 360 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: 'S', label: 'P' },
      { id: 'M', label: 'M' },
      { id: 'L', label: 'G' },
      { id: 'XL', label: 'GG' }
    ]
  },
  {
    id: 'cap',
    label: 'Boné Trucker',
    description: 'Boné estilo trucker com ajuste snapback. Perfeito para personalização.',
    category: 'vestuario',
    designUnit: 'Inch',
    unitPrice: 39.90,
    rating: 4.6,
    reviewCount: 89,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/cap/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Frente',
        pageSize: { width: 4.5, height: 3 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/cap/{{color}}_front.png`,
            width: 736,
            height: 760
          }],
          printableAreaPx: { x: 736 / 2 - 300 / 2, y: 760 / 2 - 200 / 2 - 50, width: 300, height: 200 }
        }
      },
      {
        id: 'back',
        label: 'Traseira',
        pageSize: { width: 2.99, height: 1.38 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/cap/{{color}}_back.png`,
            width: 736,
            height: 760
          }],
          printableAreaPx: { x: 269, y: 244, width: 199, height: 92 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: 'one-size', label: 'Tamanho Único' }
    ]
  },
  {
    id: 'mug',
    label: 'Caneca Cerâmica',
    description: 'Caneca de cerâmica de alta qualidade. Impressão sublimática durável.',
    category: 'acessorios',
    designUnit: 'Inch',
    unitPrice: 34.90,
    featured: true,
    rating: 4.7,
    reviewCount: 312,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/mug/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Design',
        pageSize: { width: 9, height: 11.58 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/mug/{{color}}.png`,
            width: 841,
            height: 762
          }],
          printableAreaPx: { x: 155, y: 186, width: 300, height: 386 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: '11oz', label: '325ml' }
    ]
  },
  {
    id: 'phonecase',
    label: 'Capinha de Celular',
    description: 'Capinha resistente para smartphone. Proteção com estilo personalizado.',
    category: 'acessorios',
    designUnit: 'Inch',
    unitPrice: 44.90,
    rating: 4.5,
    reviewCount: 178,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/phonecase/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Design',
        pageSize: { width: 2.75, height: 3.12 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/phonecase/{{color}}.png`,
            width: 494,
            height: 917
          }],
          printableAreaPx: { x: 73, y: 321, width: 348, height: 341 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: 'iphone14pro', label: 'iPhone 14 Pro' }
    ]
  },
  {
    id: 'totebag',
    label: 'Ecobag',
    description: 'Sacola ecológica reutilizável. Sustentabilidade com design personalizado.',
    category: 'acessorios',
    designUnit: 'Inch',
    unitPrice: 39.90,
    rating: 4.8,
    reviewCount: 145,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/totebag/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Design',
        pageSize: { width: 15.37, height: 13.45 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/totebag/{{color}}.png`,
            width: 751,
            height: 1225
          }],
          printableAreaPx: { x: 132, y: 619, width: 489, height: 432.32 }
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: 'one-size', label: 'Tamanho Único' }
    ]
  },
  {
    id: 'arrowsign',
    label: 'Placa Direcional',
    description: 'Placa de sinalização personalizada. Ideal para eventos e comércios.',
    category: 'sinalizacao',
    designUnit: 'Inch',
    unitPrice: 79.90,
    rating: 4.9,
    reviewCount: 67,
    thumbnailUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/arrowsign/thumbnail.png`,
    areas: [
      {
        id: 'front',
        label: 'Design',
        pageSize: { width: 37.88, height: 25 },
        mockup: {
          images: [{
            uri: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/arrowsign/{{color}}.png`,
            width: 1039,
            height: 963
          }],
          printableAreaPx: { x: 59, y: 42, width: 947, height: 625 },
          editingMaskUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/arrowsign/editing-mask.png`,
          exportingMaskUrl: `${BASE_URL}${PUBLIC_URL}/cases/product-editor-ui/arrowsign/exporting-mask.png`
        }
      }
    ],
    colors: [
      { id: 'white', label: 'Branco', colorHex: '#FFFFFF', isDefault: true },
      { id: 'black', label: 'Preto', colorHex: '#000000' },
      { id: 'blue', label: 'Azul', colorHex: '#1F40D3' },
      { id: 'gray', label: 'Cinza', colorHex: '#929292' },
      { id: 'green', label: 'Verde', colorHex: '#43D31F' },
      { id: 'red', label: 'Vermelho', colorHex: '#E02D27' }
    ],
    sizes: [
      { id: '24x12', label: '60cm x 30cm' }
    ]
  }
];
