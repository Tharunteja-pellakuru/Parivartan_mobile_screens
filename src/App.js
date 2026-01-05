import './App.css';
import HomeContainer from './components/HomeContainer/HomeContainer';
import SwipeableLayout from './components/MarketingComponents/SwipeableLayout';
import { DigitalMarketingCard } from './components/MarketingComponents/DigitalMarketingCard';
import { SeoCard } from './components/MarketingComponents/SeoCard';
import { AdCampaignsCard } from './components/MarketingComponents/AdCampaignsCard';
import { ReputationCard } from './components/MarketingComponents/ReputationCard';
import { WhyChooseUs } from './components/WhyChooseUs/WhyChooseUs';
import { FAQ } from './components/FAQ/FAQ';
import Testimonials from './components/Testimonials/Testimonials';
import ContactFooter from './components/ContactFooter/ContactFooter';
import BottomNav from './components/BottomNav/BottomNav';

function App() {
  return (
    <div className="App">
      <HomeContainer />
      <SwipeableLayout>
        <DigitalMarketingCard />
        <SeoCard />
        <AdCampaignsCard />
        <ReputationCard />
      </SwipeableLayout>
      <WhyChooseUs />
      <FAQ />
      <Testimonials />
      <ContactFooter />
      <BottomNav />
    </div>
  );
}

export default App;
