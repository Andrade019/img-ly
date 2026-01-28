'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import styles from './editor.module.css';
import { PRODUCTS } from '../data';
import { Product, CartItem } from '../types';

// License key for CE.SDK
const LICENSE_KEY = 'HPQ3SfpQ8KrBII-WlJvd7CJOUW-2OB4asWfn_XGaIQW_WAjKBrZvT43r3zIvgiDf';

export default function EditorComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const productId = searchParams.get('product') || 'tshirt';
  const initialColor = searchParams.get('color') || 'white';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedArea, setSelectedArea] = useState('front');
  const [quantity, setQuantity] = useState(1);
  const [instance, setInstance] = useState<CreativeEditorSDK | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef(selectedColor);
  colorRef.current = selectedColor;

  // Encontrar o produto
  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0].id);
      const defaultColor = foundProduct.colors.find(c => c.isDefault)?.id || foundProduct.colors[0].id;
      setSelectedColor(initialColor || defaultColor);
    }
  }, [productId, initialColor]);

  // Configuração do editor
  const config = useMemo<Partial<Configuration>>(() => ({
    role: 'Adopter',
    theme: 'light',
    license: LICENSE_KEY,
    featureFlags: {
      singlePageMode: true
    },
    callbacks: {
      onUpload: 'local'
    },
    ui: {
      elements: {
        view: 'default',
        panels: {
          settings: true
        },
        navigation: {
          action: {
            export: true
          }
        }
      }
    }
  }), []);

  // Criar cena com o produto
  const createSceneWithProduct = useCallback(async (cesdk: CreativeEditorSDK, prod: Product, color: string, areaId: string) => {
    const engine = cesdk.engine;
    
    // Encontrar a área do produto
    const area = prod.areas.find(a => a.id === areaId) || prod.areas[0];
    if (!area?.mockup) return;

    // Criar nova cena
    await engine.scene.create();
    
    // Criar página
    const page = engine.block.create('page');
    engine.block.setName(page, area.id);
    
    // Configurar tamanho da página baseado no mockup
    const mockupImage = area.mockup.images[0];
    engine.block.setWidth(page, mockupImage.width);
    engine.block.setHeight(page, mockupImage.height);
    
    // Adicionar página à cena
    const scene = engine.scene.get();
    if (scene) {
      engine.block.appendChild(scene, page);
    }

    // Criar bloco de imagem do mockup
    const mockupBlock = engine.block.create('graphic');
    engine.block.setKind(mockupBlock, 'image');
    
    // Configurar imagem do mockup
    const imageUri = mockupImage.uri.replace('{{color}}', color);
    const imageFill = engine.block.createFill('image');
    engine.block.setString(imageFill, 'fill/image/imageFileURI', imageUri);
    engine.block.setFill(mockupBlock, imageFill);
    
    // Posicionar mockup
    engine.block.setPositionX(mockupBlock, 0);
    engine.block.setPositionY(mockupBlock, 0);
    engine.block.setWidth(mockupBlock, mockupImage.width);
    engine.block.setHeight(mockupBlock, mockupImage.height);
    
    // Adicionar mockup à página (como fundo)
    engine.block.appendChild(page, mockupBlock);
    engine.block.setAlwaysOnBottom(mockupBlock, true);
    engine.block.setScopeEnabled(mockupBlock, 'layer/move', false);
    engine.block.setScopeEnabled(mockupBlock, 'layer/resize', false);
    
    // Criar área de design (printable area)
    const printArea = area.mockup.printableAreaPx;
    const designBlock = engine.block.create('graphic');
    engine.block.setKind(designBlock, 'rect');
    
    // Configurar área de design
    engine.block.setPositionX(designBlock, printArea.x);
    engine.block.setPositionY(designBlock, printArea.y);
    engine.block.setWidth(designBlock, printArea.width);
    engine.block.setHeight(designBlock, printArea.height);
    
    // Configurar fill transparente para área de design
    const rectFill = engine.block.createFill('color');
    engine.block.setColor(rectFill, 'fill/color/value', { r: 1, g: 1, b: 1, a: 0.1 });
    engine.block.setFill(designBlock, rectFill);
    
    // Configurar stroke para indicar área editável
    engine.block.setStrokeEnabled(designBlock, true);
    engine.block.setStrokeWidth(designBlock, 2);
    engine.block.setStrokeColor(designBlock, { r: 0.4, g: 0.4, b: 0.9, a: 0.5 });
    
    engine.block.appendChild(page, designBlock);
    
    // Ajustar zoom para ver todo o produto
    engine.scene.zoomToBlock(page, 40, 40, 40, 40);
    
  }, []);

  // Inicializar o editor
  useEffect(() => {
    if (!containerRef.current || !product) return;

    let cesdk: CreativeEditorSDK | null = null;
    let removed = false;

    const initEditor = async () => {
      try {
        cesdk = await CreativeEditorSDK.create(containerRef.current!, config);
        
        if (removed) {
          cesdk.dispose();
          return;
        }

        // Configurar assets
        await cesdk.addDefaultAssetSources();
        await cesdk.addDemoAssetSources({ sceneMode: 'Design' });

        // Configurar features
        cesdk.feature.enable('ly.img.placeholder', false);
        cesdk.feature.enable('ly.img.preview', false);
        cesdk.feature.enable('ly.img.page.resize', false);

        // Criar cena inicial
        await createSceneWithProduct(cesdk, product, selectedColor, selectedArea);

        setInstance(cesdk);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao inicializar editor:', error);
        setIsLoading(false);
      }
    };

    initEditor();

    return () => {
      removed = true;
      cesdk?.dispose();
      setInstance(null);
    };
  }, [product, config, createSceneWithProduct]);

  // Atualizar quando cor ou área mudar
  useEffect(() => {
    if (instance && product) {
      createSceneWithProduct(instance, product, selectedColor, selectedArea);
    }
  }, [selectedColor, selectedArea]);

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
  };

  const handleExport = async () => {
    if (!instance) return;
    
    try {
      const engine = instance.engine;
      const pages = engine.block.findByType('page');
      
      if (pages.length > 0) {
        const blob = await engine.block.export(pages[0], {
          mimeType: 'image/png'
        });
        
        // Download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product?.label || 'design'}-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  const handleAddToCart = () => {
    // Aqui você pode salvar o design e adicionar ao carrinho
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className={styles.editorPage}>
      {/* Header do Editor */}
      <header className={styles.editorHeader}>
        <div className={styles.editorHeaderLeft}>
          <button className={styles.backButton} onClick={() => router.push('/novacores')}>
            ← Voltar
          </button>
          <div className={styles.productInfo}>
            <h1>{product.label}</h1>
            <span className={styles.productPrice}>{formatPrice(product.unitPrice)}</span>
          </div>
        </div>
        
        <div className={styles.editorHeaderRight}>
          <button className={styles.exportButton} onClick={handleExport}>
            📥 Exportar Design
          </button>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            🛒 Adicionar ao Carrinho
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className={styles.editorContent}>
        {/* Área do Editor */}
        <div className={styles.editorWrapper}>
          {isLoading && (
            <div className={styles.editorLoading}>
              <div className={styles.spinner}></div>
              <p>Carregando editor...</p>
            </div>
          )}
          <div 
            ref={containerRef} 
            className={styles.editorContainer}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </div>

        {/* Sidebar de Opções */}
        <aside className={styles.editorSidebar}>
          <div className={styles.sidebarSection}>
            <h3>Produto</h3>
            <div className={styles.productPreview}>
              <img src={product.thumbnailUrl} alt={product.label} />
              <span>{product.label}</span>
            </div>
          </div>

          {/* Seleção de Área (se tiver múltiplas) */}
          {product.areas.length > 1 && (
            <div className={styles.sidebarSection}>
              <h3>Área de Impressão</h3>
              <div className={styles.areaButtons}>
                {product.areas.map(area => (
                  <button
                    key={area.id}
                    className={`${styles.areaButton} ${selectedArea === area.id ? styles.active : ''}`}
                    onClick={() => handleAreaChange(area.id)}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seleção de Cor */}
          <div className={styles.sidebarSection}>
            <h3>Cor do Produto</h3>
            <div className={styles.colorGrid}>
              {product.colors.map(color => (
                <button
                  key={color.id}
                  className={`${styles.colorButton} ${selectedColor === color.id ? styles.active : ''}`}
                  style={{ backgroundColor: color.colorHex }}
                  onClick={() => handleColorChange(color.id)}
                  title={color.label}
                />
              ))}
            </div>
            <p className={styles.colorLabel}>
              {product.colors.find(c => c.id === selectedColor)?.label}
            </p>
          </div>

          {/* Seleção de Tamanho */}
          <div className={styles.sidebarSection}>
            <h3>Tamanho</h3>
            <div className={styles.sizeGrid}>
              {product.sizes.map(size => (
                <button
                  key={size.id}
                  className={`${styles.sizeButton} ${selectedSize === size.id ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className={styles.sidebarSection}>
            <h3>Quantidade</h3>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Total */}
          <div className={styles.sidebarSection}>
            <div className={styles.totalPrice}>
              <span>Total:</span>
              <strong>{formatPrice(product.unitPrice * quantity)}</strong>
            </div>
          </div>

          {/* Dicas */}
          <div className={styles.tipsSection}>
            <h4>💡 Dicas</h4>
            <ul>
              <li>Use imagens de alta resolução para melhor qualidade</li>
              <li>A área destacada indica onde seu design será impresso</li>
              <li>Arraste elementos para reposicioná-los</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Toast de confirmação */}
      {showAddedToCart && (
        <div className={styles.toast}>
          ✓ Produto adicionado ao carrinho!
        </div>
      )}
    </div>
  );
}
