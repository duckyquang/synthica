import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import WorkWithUs from "./pages/WorkWithUs";
import Newsletter from "./pages/Newsletter";
import Article from "./pages/Article";
import Admin from "./pages/Admin";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/newsletter/:slug" element={<Article />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
