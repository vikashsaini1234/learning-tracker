import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryView from "./pages/CategoryView";
import Topics from "./pages/Topics";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        <Navbar />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/category" element={<Category />} />
            <Route path="/category/:id" element={<CategoryView />} />
            <Route path="/topics" element={<Topics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
