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
import { ThemeProvider } from "../contexts/ThemeContext";
import ApplicationError from "@/core/errors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ApplicationError && error.status === 429) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key.");
}

const App = () => (
  <ThemeProvider>
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
  </ThemeProvider>
);

export default App;
