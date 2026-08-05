import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
