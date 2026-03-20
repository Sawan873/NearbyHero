import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import TrustSafety from "../components/TrustSafety";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home({ user, setUser }) {
  return (
    <div className="bg-gray-50">
      <Navbar user={user} setUser={setUser} />
      <Hero />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <TrustSafety />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
