import "@/ui/styles/global.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/ui/contexts/ModalContext";
import { ApiActivityProvider } from "@/ui/contexts/ApiActivityContext";
import AppRouter from "@/ui/routes/components/Router";
import AppModal from "@/ui/components/AppModal";
import { CLERK_PUBLISHABLE_KEY } from "@/core/env";
import AuthTokenHandler from "@/ui/handlers/AuthTokenHandler";
import ApiActivityHandler from "@/ui/handlers/ApiActivityHandler";

const queryClient = new QueryClient();

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key.");
}

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <AuthTokenHandler />
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ApiActivityProvider>
          <ApiActivityHandler />
          <AppRouter />
          <AppModal />
        </ApiActivityProvider>
      </ModalProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
