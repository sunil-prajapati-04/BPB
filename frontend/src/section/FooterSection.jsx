import { MapPin, ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import bpbLogo from '../assets/bpb.jpg'
import '../styles/footerSection.css'

const phoneNumber = '9414795960'
const whatsappUrl = `https://wa.me/91${phoneNumber}`
const instagramUrl = 'https://www.instagram.com/bhagatpaan_bhandar01/?hl=en'

const branches = [
  {
    name: 'Branch 1',
    address: '10B, Gopalpura Bypass Rd, 10 B Scheme, Vishveshvariya Nagar, Arjun Nagar, Jaipur, Rajasthan 302018',
    mapUrl: 'https://share.google/fssn1d4lXqJPiAUYk',
  },
  {
    name: 'Branch 2',
    address: '9, Arjun Nagar Phatak Rd, Arjun Nagar North, Bhagirath Nagar, Gopal Pura Mode, Jaipur, Rajasthan 302015',
    mapUrl: 'https://share.google/FlhSE4xf0oq6ahplv',
  },
  {
    name: 'Branch 3',
    address: 'Vidyut nagar, Ajmer Rd, near RJ14 Restaurant, DCM, Jaipur, Rajasthan 302021',
    mapUrl: 'https://share.google/42Bdf5ic6BKEfc7Wy',
  },
]

const FooterSection = () => {
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-inner">
        <div className="footer-brand-panel">
          <img className="footer-logo" src={bpbLogo} alt="Bhagat Paan Bhandar" />
          <h2 id="footer-heading">Aaiye, Ek Paan Ho Jaaye...</h2>
          <p>Baaki Baatein Baad Ho Jaayengi.</p>
          <div className="footer-socials" aria-label="Social links">
            <a
              className="footer-social-link whatsapp-link"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Bhagat Paan Bhandar on WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <a
              className="footer-social-link instagram-link"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Bhagat Paan Bhandar on Instagram"
              title="Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </a>
          </div>
          <span className="footer-note">Serving Jaipur with a little more sweetness.</span>
        </div>

        <div className="branch-grid" aria-label="Our branch locations">
          {branches.map((branch) => (
            <a
              className="branch-card"
              href={branch.mapUrl}
              target="_blank"
              rel="noreferrer"
              key={branch.name}
            >
              <div className="branch-card-header">
                <span className="branch-icon" aria-hidden="true">
                  <MapPin size={18} strokeWidth={1.8} />
                </span>
                <span className="branch-name">{branch.name}</span>
                <ArrowUpRight className="branch-arrow" size={18} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p>{branch.address}</p>
              <span className="branch-phone">{phoneNumber}</span>
              <span className="branch-action">Open in Google Maps</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bhagat Paan Bhandar</span>
        <span>Jaipur, Rajasthan</span>
      </div>
    </footer>
  )
}

export default FooterSection
