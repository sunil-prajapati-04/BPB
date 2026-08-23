import React from 'react';
import { ArrowUp } from 'lucide-react';
import '../styles/HeroSection.css';
import heroSectionVideo from '../assets/heroSectionVideo.mp4';
import klpaan from '../assets/klpaan.png';
import HeroText from '../components/FoldText';

const HeroSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero-section"
    >
      <video
        className="hero-section-video"
        src={heroSectionVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-section-content">
        <div className='hero-Text'>
        <HeroText
  text="BHAGAT  PAAN  BHANDAR"
  splitBy="char"
  hinge="top"
  trigger="mount"
  duration={0.65}
  stagger={0.045}
  ease="power3.out"
  perspective={700}
  creaseShading={0.6}
  fontSize={55}
  fontWeight={850}
  color="#228B22"
/>
        <div className="hero-subtitle-row">
          <div className="hero-text-subtitle">
            <p className="hero-text-line"><span></span>aapke labo ki shaan</p>
            <p className="hero-text-line line2"><span></span>Bhagat ji ka Paan</p>
          </div>
          <img className="hero-subtitle-icon" src={klpaan} alt="Paan" />
        </div>
        </div>
      </div>
      <button
        className="page-up-button"
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={2.5} aria-hidden="true" />
      </button>
     
    </section>
  );
};

export default HeroSection;
