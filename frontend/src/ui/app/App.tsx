import "@/ui/styles/global.css";
import AppRouter from "@/ui/routes/components/Router";
import Footer from "@/ui/components/Footer";

const App = () => (
  <div className="flex h-screen flex-col">
    <div className="flex-1 overflow-hidden">
      <AppRouter />
    </div>
    <Footer />
  </div>
);

export default App;
