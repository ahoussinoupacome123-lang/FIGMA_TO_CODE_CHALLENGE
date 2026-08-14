import Navigation from '@/components/hemolink/Navigation';
import Hero from '@/components/hemolink/Hero';
import WhyDonate from '@/components/hemolink/WhyDonate';
import WhoCanDonate from '@/components/hemolink/WhoCanDonate';
import EligibilityTest from '@/components/hemolink/EligibilityTest';
import DonationProcess from '@/components/hemolink/DonationProcess';
import PreparationGuide from '@/components/hemolink/PreparationGuide';
import CenterDirectory from '@/components/hemolink/CenterDirectory';
import BloodReserves from '@/components/hemolink/BloodReserves';
import FAQ from '@/components/hemolink/FAQ';
import Footer from '@/components/hemolink/Footer';
import HorizontalSlider from '@/components/hemolink/HorizontalSlider';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      <main className='flex-1'>
        <Hero />
        <HorizontalSlider>
          <div data-title="Pourquoi donner"><WhyDonate /></div>
          <div data-title="Qui peut donner"><WhoCanDonate /></div>
          <div data-title="Test d'éligibilité"><EligibilityTest /></div>
          <div data-title="Processus de don"><DonationProcess /></div>
          <div data-title="Préparation"><PreparationGuide /></div>
          <div data-title="Réserves de sang"><BloodReserves /></div>
          <div data-title="FAQ"><FAQ /></div>
        </HorizontalSlider>
        <CenterDirectory />
      </main>
      <Footer />
    </div>
  );
}
