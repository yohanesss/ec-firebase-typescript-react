import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "features/Layout";
import { HomepageContainer } from "features/Homepage";
import { CategoriesContainer } from "features/Categories";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route
          path="categories/:category-key"
          element={<CategoriesContainer />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
