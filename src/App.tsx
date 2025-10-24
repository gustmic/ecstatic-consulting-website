import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Strategy from "./pages/Strategy";
import DataAnalytics from "./pages/DataAnalytics";
import Technology from "./pages/Technology";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLanding from "./pages/AdminLanding";
import AdminContent from "./pages/AdminContent";
import AdminTestimonials from "./pages/AdminTestimonials";
import NewPost from "./pages/NewPost";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Cases from "./pages/Cases";
import SetupAdmin from "./pages/SetupAdmin";
import Progress from "./pages/Progress";
import CRMDashboard from "./pages/crm/Dashboard";
import Contacts from "./pages/crm/Contacts";
import Projects from "./pages/crm/Projects";
import Settings from "./pages/crm/Settings";
import Preferences from "./pages/crm/Preferences";
import Analytics from "./pages/crm/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/data-analytics" element={<DataAnalytics />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/admin" element={<Auth />} />
            <Route path="/admin/setup" element={<SetupAdmin />} />
            <Route path="/admin/landing" element={<AdminLanding />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/new-post" element={<NewPost />} />
            <Route path="/admin/crm" element={<CRMDashboard />} />
            <Route path="/admin/crm/contacts" element={<Contacts />} />
            <Route path="/admin/crm/projects" element={<Projects />} />
            <Route path="/admin/crm/settings" element={<Settings />} />
            <Route path="/admin/crm/preferences" element={<Preferences />} />
            <Route path="/admin/crm/analytics" element={<Analytics />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
            <Route path="/:category/blog" element={<BlogList />} />
            <Route path="/:category/blog/:id" element={<BlogPost />} />
            <Route path="/:category/cases" element={<Cases />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
