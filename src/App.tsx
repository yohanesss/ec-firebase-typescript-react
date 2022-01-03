import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "features/Layout";
import { HomepageContainer } from "features/Homepage";
import { CategoriesContainer } from "features/Categories";
import { ProductContainer } from "features/Product";
import { AuthSignInRegister } from "features/Layout/AuthSignInRegister/AuthSignInRegister";
import { Cart } from "features/Cart/Cart";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "utils/components/ErrorFallback";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomepageContainer />} />
        <Route
          path="/cart"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Cart />
            </ErrorBoundary>
          }
        />
        <Route path="/login" element={<AuthSignInRegister />} />
        <Route path="/categories/:key" element={<CategoriesContainer />} />
        <Route path="/products/:key" element={<ProductContainer />} />
      </Routes>
    </Layout>
  );
}

export default App;
