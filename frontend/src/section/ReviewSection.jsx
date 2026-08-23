import { useEffect, useRef, useState } from 'react';
import api from '../lib/api';
import { Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/reviewSection.css';

const ReviewStars = ({ rating = 0 }) => (
  <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={16} fill={index < rating ? 'currentColor' : 'none'} />
    ))}
  </span>
);

const ReviewCard = ({ review, onSelect }) => (
  <button type="button" className="customer-review-card" onClick={() => onSelect(review)}>
    <span className="review-card-topline">
      <span className="review-avatar">{(review.reviewerName || 'A').charAt(0).toUpperCase()}</span>
      <span className="reviewer-name">{review.reviewerName || 'Anonymous customer'}</span>
    </span>
    <ReviewStars rating={review.rating} />
    <span className="review-card-text">“{review.reviewText || 'A wonderful experience with our special paan.'}”</span>
    <span className="review-card-action">Read full review</span>
  </button>
);

const ReviewModal = ({ review, onClose }) => (
  <div className="review-modal-backdrop" role="presentation" onMouseDown={onClose}>
    <article
      className="review-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="selected-review-name"
      onMouseDown={event => event.stopPropagation()}
    >
      <button type="button" className="review-modal-close" onClick={onClose} aria-label="Close review">
        <X size={20} />
      </button>
      <span className="review-modal-avatar">{(review.reviewerName || 'A').charAt(0).toUpperCase()}</span>
      <p className="review-modal-kicker">Customer story</p>
      <h3 id="selected-review-name">{review.reviewerName || 'Anonymous customer'}</h3>
      <ReviewStars rating={review.rating} />
      <p className="review-modal-text">“{review.reviewText || 'A wonderful experience with our special paan.'}”</p>
      {review.googleMapsUrl && (
        <a href={review.googleMapsUrl} target="_blank" rel="noreferrer" className="review-google-link">
          View on Google Maps
        </a>
      )}
    </article>
  </div>
);

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let active = true;

    api
      .get('/review/all')
      .then(response => {
        if (active) setReviews(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch(() => {
        if (active) setReviews([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!reviews.length || !trackRef.current) return undefined;

    let frameId;
    const moveTrack = () => {
      if (!pausedRef.current) {
        const firstCard = trackRef.current.firstElementChild;
        const cardDistance = firstCard ? firstCard.getBoundingClientRect().width + 20 : 0;

        if (cardDistance && offsetRef.current >= cardDistance) {
          offsetRef.current = 0;
          trackRef.current.style.transform = 'translate3d(0, 0, 0)';
          setReviews(current => [...current.slice(1), current[0]]);
        } else {
          offsetRef.current += 0.45;
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      frameId = requestAnimationFrame(moveTrack);
    };

    frameId = requestAnimationFrame(moveTrack);
    return () => cancelAnimationFrame(frameId);
  }, [reviews.length]);

  const pauseMarquee = () => {
    pausedRef.current = true;
  };

  const resumeMarquee = () => {
    pausedRef.current = false;
  };

  return (
    <section id="review-section" className="review-section" aria-labelledby="review-section-heading">
      <header className="review-section-header">
        <p className="review-section-eyebrow">Real words. Real moments.</p>
        <h2 id="review-section-heading">The Love Behind Every Paan</h2>
        <p>Hear what our customers have to say.</p>
        <Link className="review-page-link" to="/reviews">View all reviews</Link>
      </header>

      {loading ? (
        <p className="review-status">Loading customer reviews...</p>
      ) : reviews.length ? (
        <div
          className="review-marquee"
          aria-label="Customer reviews"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
          onFocus={pauseMarquee}
          onBlur={resumeMarquee}
        >
          <div ref={trackRef} className="review-marquee-track">
            {reviews.map((review, index) => (
              <ReviewCard key={review._id || `${review.reviewerName}-${review.createdAt || index}`} review={review} onSelect={setSelectedReview} />
            ))}
          </div>
        </div>
      ) : (
        <p className="review-status">Customer stories will appear here soon.</p>
      )}

      {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
    </section>
  );
}