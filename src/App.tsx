import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Collection from './pages/Collection'
import BoardDetail from './pages/BoardDetail'
import About from './pages/About'
import Waitlist from './pages/Waitlist'
import Studio from './pages/Studio'

export default function App() {
  return (
    <BrowserRouter basename="/Website">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:id" element={<BoardDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
