import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import IndexEN from "./pages/IndexEN";
import IndexOptimized from "./pages/IndexOptimized";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminContent from "./pages/AdminContent";
import SetupAdmin from "./pages/SetupAdmin";
import CRMDashboard from "./pages/crm/Dashboard";
import Contacts from "./pages/crm/Contacts";
import Companies from "./pages/crm/Companies";
import Settings from "./pages/crm/Settings";
import Analytics from "./pages/crm/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<IndexEN />} />
            <Route path="/optimized" element={<IndexOptimized />} />
            <Route path="/admin" element={<Auth />} />
            <Route path="/admin/setup" element={<SetupAdmin />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/crm" element={<CRMDashboard />} />
            <Route path="/admin/crm/contacts" element={<Contacts />} />
            <Route path="/admin/crm/companies" element={<Companies />} />
            <Route path="/admin/crm/settings" element={<Settings />} />
            <Route path="/admin/crm/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
