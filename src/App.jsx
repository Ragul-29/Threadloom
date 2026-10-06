import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import FeaturedCollection from "./components/home/FeaturedCollection";
import NewArrivals from "./components/home/NewArrivals";
import BrandStory from "./components/home/BrandStory";
import Testimonials from "./components/home/Testimonials";
import Newsletter from "./components/home/Newsletter";

import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Account from "./pages/Account/Account";
import Wishlist from "./pages/Wishlist/Wishlist";
import About from "./pages/About/About";
import SizeGuide from "./pages/SizeGuide/SizeGuide";
import Search from "./pages/Search/Search";
import Tracking from "./pages/Tracking/Tracking";
import NotFound from "./pages/NotFound/NotFound";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <NewArrivals />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AnnouncementBar />

        <Navbar />

        <main className="page">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/shop"
              element={<Shop />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/tracking/:orderId"
              element={<Tracking />}
            />

            <Route
              path="/account"
              element={<Account />}
            />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/size-guide"
              element={<SizeGuide />}
            />

            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;