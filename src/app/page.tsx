import Navigation from '@/components/hemolink/Navigation';
import Hero from '@/components/hemolink/Hero';
import WhyDonate from '@/components/hemolink/WhyDonate';
import WhoCanDonate from '@/components/hemolink/WhoCanDonate';
import EligibilityTest from '@/components/hemolink/EligibilityTest';
import DonationProcess from '@/components/hemolink/DonationProcess';
import CenterDirectory from '@/components/hemolink/CenterDirectory';
import BloodReserves from '@/components/hemolink/BloodReserves';
import FAQ from '@/components/hemolink/FAQ';
import Footer from '@/components/hemolink/Footer';
import SectionTabs from '@/components/hemolink/SectionTabs';

const tabs = [
  { id: 'pourquoi', label: 'Pourquoi ?' },
  { id: 'eligibilite', label: 'Qui peut donner ?' },
  { id: 'test', label: "Test d'éligibilité" },
  { id: 'deroulement', label: 'Le don' },
  { id: 'reserves', label: 'Réserves' },
  { id: 'faq', label: 'FAQ' },
];

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      <main id="main-content" className='flex-1' tabIndex={-1}>
        <Hero />
        <SectionTabs tabs={tabs}>
          <WhyDonate />
          <WhoCanDonate />
          <EligibilityTest />
          <DonationProcess />
          <BloodReserves />
          <FAQ />
        </SectionTabs>
        <CenterDirectory />
      </main>
      <Footer />
    </div>
  );
}
