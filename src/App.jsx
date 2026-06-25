import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import { CartProvider } from './components/cart/CartContext';
import Cart from './components/cart/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Cart />
      </Router>
    </CartProvider>
  )
}

export default App;