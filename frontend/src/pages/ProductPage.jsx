import { useEffect, useState } from 'react';
import api from '../lib/api';
import '../styles/ProductPage.css';

const DEFAULT_PRODUCT_IMAGE = 'https://placehold.co/600x600?text=BPB';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get('/product/view'),
          api.get('/product/categories'),
        ]);

        const allProducts = productsResponse.data || [];
        const allCategories = categoriesResponse.data || [];

        setProducts(allProducts);
        setCategories(['All', ...allCategories]);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setActiveImageIndex(0);
  };

  const productImages = selectedProduct?.photo?.length
    ? selectedProduct.photo.map((image) => image?.url || DEFAULT_PRODUCT_IMAGE).filter(Boolean)
    : [DEFAULT_PRODUCT_IMAGE];

  const showPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="product-page-shell">
      <section className="product-page">
        <div className="product-page-header">
          <span className="eyebrow">Our PAAN'S</span>
          <h1>Trendy & Royal Paan Collecction</h1>
        </div>

        {loading ? (
          <div className="product-grid product-grid-skeleton" aria-label="Loading product grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-skeleton-card">
                <div className="product-skeleton-image" />
                <div className="product-skeleton-line short" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="product-page-status error">{error}</div>
        ) : (
          <>
            <div className="category-filter-bar">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article
                  key={product._id || product.name}
                  className="product-item-card"
                  onMouseMove={(event) => {
                    const card = event.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const rotateY = ((x / rect.width) - 0.5) * 5;
                    const rotateX = (0.5 - (y / rect.height)) * 5;

                    card.style.transform = `translateY(-3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.002)`;
                    card.style.boxShadow = '0 18px 26px rgba(51, 44, 28, 0.1)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
                    event.currentTarget.style.boxShadow = '0 18px 32px rgba(51, 44, 28, 0.08)';
                  }}
                  onClick={() => openProductModal(product)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProductModal(product);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${product.name}`}
                >
                  <div className="product-item-image-wrap">
                    <img
                      src={product.photo?.[0]?.url || DEFAULT_PRODUCT_IMAGE}
                      alt={product.name}
                    />
                  </div>

                  <div className="product-item-details">
                    <h3>{product.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {selectedProduct && (
        <div className="product-modal-backdrop" onClick={closeProductModal}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="product-modal-close"
              onClick={closeProductModal}
              aria-label="Close product details"
            >
              ×
            </button>

            <div className="product-modal-gallery">
              <div className="product-modal-main-image-wrap">
                <img
                  src={productImages[activeImageIndex]}
                  alt={`${selectedProduct.name} view ${activeImageIndex + 1}`}
                />
              </div>

              {productImages.length > 1 && (
                <>
                  <div className="product-modal-gallery-controls">
                    <button type="button" onClick={showPrevImage} aria-label="Previous image">
                      ‹
                    </button>
                    <button type="button" onClick={showNextImage} aria-label="Next image">
                      ›
                    </button>
                  </div>

                  <div className="product-modal-thumbnails">
                    {productImages.map((image, index) => (
                      <button
                        key={`${selectedProduct._id || selectedProduct.name}-thumb-${index}`}
                        type="button"
                        className={index === activeImageIndex ? 'active' : ''}
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                      >
                        <img src={image} alt={`${selectedProduct.name} thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="product-modal-content">
              <span className="product-modal-category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p className="product-modal-description">
                {selectedProduct.description || 'No description available for this product yet.'}
              </p>

              <div className="product-modal-meta">
                <div>
                  <span className="meta-label">Category</span>
                  <strong>{selectedProduct.category || 'General'}</strong>
                </div>
                {selectedProduct.price ? (
                  <div>
                    <span className="meta-label">Price</span>
                    <strong>₹{selectedProduct.price}</strong>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
