import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/Home";
import MarketplacePage from "./pages/Marketplace";
import DocsPage from "./pages/Docs";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/docs" element={<DocsPage />} />
        {/* Redirects for legacy routes if needed */}
        <Route path="/monitor/*" element={<MarketplacePage />} />
        <Route path="/api" element={<DocsPage />} />
        <Route path="/skill" element={<DocsPage />} />
      </Routes>
    </Layout>
  );
}
