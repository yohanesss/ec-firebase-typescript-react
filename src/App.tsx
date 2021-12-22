import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "features/Layout";
import { HomepageContainer } from "features/Homepage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
      </Routes>
    </Layout>
  );
}

export default App;
