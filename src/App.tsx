import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CheckoutPage from "./pages/CheckoutPage";
import DesignDetailPage from "./pages/DesignDetailPage";
import HomepageLookbookPage from "./pages/HomepageLookbookPage";
import ProductCustomizationStudioPage from "./pages/ProductCustomizationStudioPage";
import UserAccountDashboardPage from "./pages/UserAccountDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<HomepageLookbookPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/design-detail" element={<DesignDetailPage />} />
          <Route path="/product-customization-studio" element={<ProductCustomizationStudioPage />} />
          <Route path="/user-account-dashboard" element={<UserAccountDashboardPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
