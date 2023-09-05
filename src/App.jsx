import React, { lazy, Suspense } from "react";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/common";
import FallbackUI from "./components/FallbackUI";

function App() {
  const Main = lazy(() => import("./pages/Main"));
  const Detail = lazy(() => import("./pages/Detail"));
  const Profile = lazy(() => import("./pages/Profile"));
  const Chat = lazy(() => import("./pages/Chat"));
  const ProductUpload = lazy(() => import("./pages/ProductUpload"));
  const PostUpload = lazy(() => import("./pages/PostUpload"));
  const PostUpdate = lazy(() => import("./pages/PostUpdate"));
  const ProductUpdate = lazy(() => import("./pages/ProductUpdate"));
  const Cart = lazy(() => import("./pages/Cart"));

  return (
    <BrowserRouter basename="/final-10-Goodi">
      <Suspense fallback={<FallbackUI />}>
        <ScrollToTop />
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />

          <Route path="/" element={<Main />} />
          <Route path="/productDetail/:id" element={<Detail />} />
          <Route path="/profile/:accountname" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/productUpload" element={<ProductUpload />} />
          <Route path="/postUpload" element={<PostUpload />} />
          <Route path="/product/:product_id" element={<ProductUpdate />} />
          <Route path="/post/:posting_id" element={<PostUpdate />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
