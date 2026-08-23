import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import bpbLogo from '../assets/bpb.png'
import './AdminPortal.css'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true); setError('')
    try {
      await api.post('/auth/login', form)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please try again.')
    } finally { setLoading(false) }
  }

  return <main className="admin-login-page">
    <section className="login-ambient">
      <div className="login-brand"><img src={bpbLogo} alt="Bhagat Paan Bhandar" /></div>
      <div className="login-copy"><span className="eyebrow-light">CONTROL CENTRE</span><h1>Run your storefront<br />with clarity.</h1><p>Manage your catalog, team, and customer voice from one thoughtful workspace.</p></div>
      <div className="login-note"><ShieldCheck size={18} /> Secure access for authorized team members</div>
    </section>
    <section className="login-panel"><div className="login-card">
      <div className="mobile-brand"><img src={bpbLogo} alt="Bhagat Paan Bhandar" /></div>
      <div className="login-heading"><span className="eyebrow">WELCOME BACK</span><h2>Sign in</h2><p>Use your administrator credentials to continue.</p></div>
      <form onSubmit={submit}>
        <label>Email address<input required type="email" autoComplete="email" placeholder="name@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<div className="password-input"><input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
        {error && <p className="form-error">{error}</p>}
        <button className="sign-in-btn" disabled={loading}>{loading ? 'Signing in…' : <>Sign in <ArrowRight size={18} /></>}</button>
      </form>
      <div className="login-support"><LockKeyhole size={15} /> Protected administrator area</div>
      <Link className="back-store" to="/">← Back to storefront</Link>
    </div></section>
  </main>
}
