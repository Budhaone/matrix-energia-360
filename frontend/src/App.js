import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import FamiliesCounter from "@/components/FamiliesCounter";
import Benefits from "@/components/Benefits";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Admin from "@/pages/Admin";

const LandingPage = () => (
  <div className="bg-[#0A0A0A] min-h-screen" style={{ fontFamily: "'Manrope', sans-serif" }}>
    <Header />
    <main>
      <Hero />
      <MarqueeSection />
      <PainPoints />
      <HowItWorks />
      <FamiliesCounter />
      <Benefits />
      <Calculator />
      <FAQ />
      <ContactForm />
    </main>
    <Footer />
    <WhatsAppCTA />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
