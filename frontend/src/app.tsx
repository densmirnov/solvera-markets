import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/Home";
import MarketplacePage from "./pages/Marketplace";
import IntentDetailsPage from "./pages/IntentDetails";
import DocsPage from "./pages/docs";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/marketplace/:id" element={<IntentDetailsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        {/* Redirects for legacy routes if needed */}
        <Route path="/monitor/:id" element={<IntentDetailsPage />} />
        <Route path="/monitor/*" element={<MarketplacePage />} />
        <Route path="/api" element={<DocsPage />} />
        <Route path="/skill" element={<DocsPage />} />
      </Routes>
    </Layout>
  );
}
