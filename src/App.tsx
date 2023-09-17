import { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import { Product } from './interfaces/Product';


function App() {
  const [cart, setCart] = useState<Product[]>(() => JSON.parse(localStorage.getItem('cart') ?? '[]'))

  const addToCart = (product: Product) => {
    let list = [...cart]
    const productExist = list.findIndex((item) => item.id === product.id)
    if (productExist !== -1) {
      list[productExist].quantity++;
      setCart(list)
      localStorage.setItem('cart', JSON.stringify(list))
    } else {
      list = [...cart, { ...product, added: true, quantity: 1 }]
      setCart(list);
      localStorage.setItem('cart', JSON.stringify(list))
    }
  }
  return (
    <StrictMode>
      <BrowserRouter>
        <MainLayout cartCount={cart?.length}>
          <Routes>
            <Route path='/' element={<Home addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
