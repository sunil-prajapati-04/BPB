import { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowLeft, ArrowUpRight, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/reviewPage.css'

const reviewClient = axios.create({ baseURL: 'http://localhost:8080/bpb' })

const ReviewStars = ({ rating = 0 }) => (
  <span className="all-review-stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={17} fill={index < rating ? 'currentColor' : 'none'} />
    ))}
  </span>
)

const ReviewPageCard = ({ review, onSelect }) => (
  <button type="button" className="all-review-card" onClick={() => onSelect(review)}>
    <span className="all-review-card-topline">
      <span className="all-review-avatar">{(review.reviewerName || 'A').charAt(0).toUpperCase()}</span>
      <span className="all-reviewer-name">{review.reviewerName || 'Anonymous customer'}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </span>
    <ReviewStars rating={review.rating} />
    <span className="all-review-card-text">“{review.reviewText || 'A wonderful experience with our special paan.'}”</span>
    <span className="all-review-card-action">Read full review</span>
  </button>
)

const ReviewModal = ({ review, onClose }) => (
  <div className="all-review-modal-backdrop" role="presentation" onMouseDown={onClose}>
    <article
      className="all-review-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-review-modal-name"
      onMouseDown={event => event.stopPropagation()}
    >
      <button type="button" className="all-review-modal-close" onClick={onClose} aria-label="Close review">
        <X size={20} />
      </button>
      <span className="all-review-modal-avatar">{(review.reviewerName || 'A').charAt(0).toUpperCase()}</span>
      <p className="all-review-kicker">Customer story</p>
      <h2 id="all-review-modal-name">{review.reviewerName || 'Anonymous customer'}</h2>
      <ReviewStars rating={review.rating} />
      <p className="all-review-modal-text">“{review.reviewText || 'A wonderful experience with our special paan.'}”</p>
      {review.googleMapsUrl && (
        <a href={review.googleMapsUrl} target="_blank" rel="noreferrer" className="all-review-google-link">
          View on Google Maps
        </a>
      )}
    </article>
  </div>
)

export default function ReviewPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    let active = true

    reviewClient
      .get('/review/all')
      .then(response => {
        if (active) setReviews(Array.isArray(response.data.data) ? response.data.data : [])
      })
      .catch(() => {
        if (active) setReviews([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="all-reviews-page">
      <div className="all-reviews-page-inner">
        <Link className="all-reviews-back-link" to="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to home
        </Link>
        <header className="all-reviews-header">
          <p className="all-reviews-eyebrow">Real words. Real moments.</p>
          <h1>The Love Behind Every Paan</h1>
          <p>Every review is a little reminder of why Jaipur keeps coming back.</p>
        </header>

        {loading ? (
          <p className="all-reviews-status">Loading customer reviews...</p>
        ) : reviews.length ? (
          <div className="all-reviews-grid">
            {reviews.map((review, index) => (
              <ReviewPageCard
                key={review._id || `${review.reviewerName}-${review.createdAt || index}`}
                review={review}
                onSelect={setSelectedReview}
              />
            ))}
          </div>
        ) : (
          <p className="all-reviews-status">Customer stories will appear here soon.</p>
        )}
      </div>
      {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
    </main>
  )
}
