import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { CityHubPage, ServiceCityPage, ServiceHubPage, ServicesIndexPage, ServingIndexPage } from "./pages/LocalSeoPages";
import { ChecklistIndexPage, ChecklistPage, ComparisonIndexPage, ComparisonPage, GuideIndexPage, GuidePage } from "./pages/SeoResources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/process" component={HowItWorks} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/guides" component={GuideIndexPage} />
      <Route path="/guides/:slug" component={GuidePage} />
      <Route path="/compare" component={ComparisonIndexPage} />
      <Route path="/compare/:slug" component={ComparisonPage} />
      <Route path="/checklists" component={ChecklistIndexPage} />
      <Route path="/checklists/:slug" component={ChecklistPage} />
      <Route path="/services" component={ServicesIndexPage} />
      <Route path="/services/:serviceSlug" component={ServiceHubPage} />
      <Route path="/services/:serviceSlug/:citySlug" component={ServiceCityPage} />
      <Route path="/service-area" component={ServingIndexPage} />
      <Route path="/service-area/:citySlug" component={CityHubPage} />
      <Route path="/service-area" component={ServingIndexPage} />
      <Route path="/service-area/:citySlug" component={CityHubPage} />
      <Route path="/serving" component={ServingIndexPage} />
      <Route path="/service-area/:slug" component={CityHubPage} />
      <Route path="/serving/:citySlug" component={CityHubPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
