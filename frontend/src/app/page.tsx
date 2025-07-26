import { Header, Footer } from '@/components/layout';
import { HeroSection, CTASection } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-20">
        <HeroSection variant="home" />
        <CTASection variant="gradient" theme="red-black" />
      </main>
      <Footer />
    </>
  );
}