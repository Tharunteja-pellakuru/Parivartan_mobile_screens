import './App.css';
import SwipeableLayout from './components/MarketingComponents/SwipeableLayout';
import { DigitalMarketingCard } from './components/MarketingComponents/DigitalMarketingCard';
import { SeoCard } from './components/MarketingComponents/SeoCard';
import { AdCampaignsCard } from './components/MarketingComponents/AdCampaignsCard';
import { ReputationCard } from './components/MarketingComponents/ReputationCard';
import { WhyChooseUs } from './components/WhyChooseUs/WhyChooseUs';
import { FAQ } from './components/FAQ/FAQ';

function App() {
  return (
    <div className="App">
      <SwipeableLayout>
        <DigitalMarketingCard />
        <SeoCard />
        <AdCampaignsCard />
        <ReputationCard />
      </SwipeableLayout>
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}

export default App;
