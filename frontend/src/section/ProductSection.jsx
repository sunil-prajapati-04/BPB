import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/ProductSection.css'

gsap.registerPlugin(ScrollTrigger)

import bh1 from '../categoryPhoto/BH\'s-1.avif'
import bh2 from '../categoryPhoto/BH\'s-2.avif'
import bh3 from '../categoryPhoto/BH\'s-3.avif'
import bh4 from '../categoryPhoto/BH\'s-4.avif'
import fl1 from '../categoryPhoto/FL-1.avif'
import fl2 from '../categoryPhoto/FL-2.avif'
import fl3 from '../categoryPhoto/FL-3.avif'
import fl4 from '../categoryPhoto/FL-4.avif'
import bn1 from '../categoryPhoto/BN-1.avif'
import bn2 from '../categoryPhoto/BN-2.avif'
import bn3 from '../categoryPhoto/BN-3.avif'
import bn4 from '../categoryPhoto/BN-4.avif'
import bn5 from '../categoryPhoto/BN-5.avif'

const productCategories = [
  { name: "BH's Special", label: "BH - Bhagat's Special", images: [bh1, bh2, bh3, bh4] },
  { name: 'Flavoured Paan', label: 'Flavoured Paan', images: [fl1, fl2, fl3, fl4] },
  { name: 'BABA Navratan', label: 'BABA Navratan', images: [bn1, bn2, bn3, bn4, bn5] },
]

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].name)
  const [selectedImage, setSelectedImage] = useState(null)
  const headingRef = useRef(null)

  const activeProducts =
    productCategories.find((category) => category.name === activeCategory)?.images ?? []

  const marqueeImages = [...activeProducts, ...activeProducts, ...activeProducts]

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <main className="page-shell">
      <section className="product-showcase" id="product-page">
        <h1 ref={headingRef} className="product-section-heading">Our Royal Bhagat's Paan</h1>
        <div className="showcase-header">
          <div className="category-switcher" aria-label="Product categories">
            {productCategories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={`category-pill ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <a href="/products" className="view-all-btn">
            View Full Menu
          </a>
        </div>

        <div className="product-marquee" aria-live="polite">
          <div className="product-marquee-track">
            {marqueeImages.map((image, index) => (
              <article
                key={`${activeCategory}-${index}`}
                className="product-card"
                onClick={() => setSelectedImage(image)}
              >
                <div className="product-image-wrap">
                  <img src={image} alt={`${activeCategory} product`} />
                </div>
                <span className="product-card-label">{productCategories.find((category) => category.name === activeCategory)?.label ?? activeCategory}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="product-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="product-lightbox" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="product-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close product preview"
            >
              ×
            </button>
            <div className="product-lightbox-header">
              <span className="product-lightbox-category">{activeCategory}</span>
            </div>
            <img src={selectedImage} alt="Selected product preview" />
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductSection
