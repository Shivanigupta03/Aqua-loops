import { Route, Routes } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { Layout } from "@/components/layout/Layout"
import Home from "@/pages/Home"
import AboutImpact from "@/pages/AboutImpact"
import Shop from "@/pages/Shop"
import ProductDetail from "@/pages/ProductDetail"
import CartPage from "@/pages/Cart"
import Checkout from "@/pages/Checkout"
import Contact from "@/pages/Contact"
import NotFound from "@/pages/NotFound"

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutImpact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}
