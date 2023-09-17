import { StrictMode, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import { Product } from './interfaces/Product';


function App() {
  const [cart, setCart] = useState<Product[]>(() => JSON.parse(localStorage.getItem('cart') ?? '[]'))
  const [total, setTotal] = useState<number>(0)

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
  const remove = (index: number) => {
    const list = [...cart]
    list.splice(index, 1)
    setCart(list)
    getTotal(list)
    localStorage.setItem('cart', JSON.stringify(list))
  }
  const getTotal = (list: Product[]) => {
    let total = 0;
    for (const item of list) {
      total += item.price * item.quantity;

    }
    setTotal(total)
  }
  const emptyCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }
  return (
    <StrictMode>
      <BrowserRouter>
        <MainLayout cartCount={cart?.length}>
          <Routes>
            <Route path='/' element={<Home addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart emptyCart={emptyCart} remove={remove} getTotal={getTotal} total={total} />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
