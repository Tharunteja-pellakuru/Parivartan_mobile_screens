import './App.css';
import HomeContainer from './components/HomeContainer/HomeContainer';
import PortfolioContainer from './components/PortfolioContainer/PortfolioContainer';
import ServicesShowcase from './components/PortfolioContainer/ServicesShowcase';
import { WhyChooseUs } from './components/WhyChooseUs/WhyChooseUs';
import { FAQ } from './components/FAQ/FAQ';
import Testimonials from './components/Testimonials/Testimonials';
import ContactFooter from './components/ContactFooter/ContactFooter';
import BottomNav from './components/BottomNav/BottomNav';

function App() {
  return (
    <div className="App">
      <HomeContainer />
      <PortfolioContainer />
      <ServicesShowcase />
      <WhyChooseUs />
      <FAQ /> 
      <Testimonials />
      <ContactFooter />
      <BottomNav />
    </div>
  );
}

export default App;
