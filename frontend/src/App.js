import "@/App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0A0A0A] min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <Header />
        <main>
          <Hero />
          <MarqueeSection />
          <PainPoints />
          <HowItWorks />
          <Benefits />
          <FAQ />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
