import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HabitDetail from "./pages/HabitDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habit/:id" element={<HabitDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
