import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "features/Layout";
import { HomepageContainer } from "features/Homepage";
import { CategoriesContainer } from "features/Categories";
import { ProductContainer } from "features/Product";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route path="/categories/:key" element={<CategoriesContainer />} />
        <Route path="/products/:key" element={<ProductContainer />} />
      </Routes>
    </Layout>
  );
}

export default App;
