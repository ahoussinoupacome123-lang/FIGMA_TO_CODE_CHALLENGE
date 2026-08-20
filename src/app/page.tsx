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
import ScrollEnhancements from '@/components/hemolink/ScrollEnhancements';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navigation />
      <ScrollEnhancements />
      <main id="main-content" className='flex-1' tabIndex={-1}>
        <Hero />
        <WhyDonate />
        <WhoCanDonate />
        <EligibilityTest />
        <DonationProcess />
        <CenterDirectory />
        <BloodReserves />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
