import Hero from '../components/Hero';
import History from '../components/History';
import ServicesSection from '../components/ServicesSection';
import RecentProjects from '../components/RecentProjects';
import Testimonial from '../components/Testimonial';
import Awards from '../components/Awards';
import TrustedBy from '../components/TrustedBy';
import ClientTestimonials from '../components/ClientTestimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <History />
      <ServicesSection />
      <RecentProjects />
      <Testimonial />
      <Awards />
      <TrustedBy />
      <ClientTestimonials />
      <CTA />
    </>
  );
};

export default Home;
