import "@/ui/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "../contexts/ModalContext";
import AppRouter from "../routes/components/Router";
import AppModal from "../components/AppModal";

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
