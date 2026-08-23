import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './section/HeroSection'
import ProductSection from './section/ProductSection'
import ProductPage from './pages/ProductPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import OrderSection from './section/order.section'
import ReviewSection from './section/ReviewSection'
import FooterSection from './section/FooterSection'
import ReviewPage from './pages/ReviewPage'

function App() {
  const { pathname } = useLocation()
  const isAdminArea = pathname.startsWith('/admin')
  return (
    <>
      {!isAdminArea && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <ProductSection />
            <OrderSection />
            <ReviewSection />
            <FooterSection />
          </>
        } />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminDashboard />} />
        <Route path="/admin/admins" element={<AdminDashboard />} />
        <Route path="/admin/reviews" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
