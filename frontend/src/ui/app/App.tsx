import "@/ui/styles/global.css";
import AppRouter from "@/ui/routes/components/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/ui/contexts/ModalContext";
import AppModal from "@/ui/components/AppModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <AppRouter />
      <AppModal />
    </ModalProvider>
  </QueryClientProvider>
);

export default App;
