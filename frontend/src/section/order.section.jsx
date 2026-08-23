import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../styles/orderSection.css';
import paanImage from '../assets/paan.jpg';
import bhImage from "../categoryPhoto/BH's-1.avif";
import bnImage from '../categoryPhoto/BN-1.avif';
import flImage from '../categoryPhoto/FL-1.avif';
import bhSecondImage from "../categoryPhoto/BH's-2.avif";
import bnSecondImage from '../categoryPhoto/BN-2.avif';

const depthItems = [
  { image: bhImage, label: 'Bhagat Special' },
  { image: bnImage, label: 'Banarasi Paan' },
  { image: paanImage, label: 'Freshly Crafted' },
  { image: flImage, label: 'Flavoured Paan' },
  { image: bhSecondImage, label: 'Celebration Paan' },
  { image: bnSecondImage, label: 'Classic Favourite' }
];

const getOffset = (index, activeIndex, length) => {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

const DepthPhotoCarousel = () => {
  const [active, setActive] = useState(2);
  const move = direction => setActive(current => (current + direction + depthItems.length) % depthItems.length);

  return (
    <div className="depth-carousel" aria-label="Paan photo carousel">
      <div className="depth-carousel-stage">
      {depthItems.map((item, index) => {
        const offset = getOffset(index, active, depthItems.length);
        const isActive = offset === 0;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={item.label}
            className={`depth-card ${isActive ? 'is-active' : ''}`}
            style={{ '--depth-offset': offset }}
            onClick={() => setActive(index)}
            role="group"
            aria-hidden={!isActive}
            aria-label={item.label}
          >
            <img src={item.image} alt={item.label} draggable="false" />
            <span className="depth-card-shade" aria-hidden="true" />
            <span className="depth-card-label">{item.label}</span>
          </Tag>
        );
        })}
      </div>
      <div className="depth-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous photo"><ArrowLeft size={18} /></button>
        <div className="depth-carousel-dots" aria-label="Choose a photo">
          {depthItems.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Show ${item.label}`}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next photo"><ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

const OrderSection = () => (
  <section id="order-section" className="order-section">
    <header className="order-section-header">
      <p className="order-section-eyebrow">Serving Special Paan at Events &amp; Celebrations</p>
      <h2>Paan That Makes Every Occasion Memorable</h2>
      <p className="order-section-subtitle">
        Special Paan Orders for Weddings, Parties, Functions &amp; Every Memorable Occasion.
      </p>
    </header>
    <DepthPhotoCarousel />
    </section>
);

export default OrderSection;
