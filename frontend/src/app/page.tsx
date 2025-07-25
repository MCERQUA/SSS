import { Header } from '@/components/layout';
import { HeroSection } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection variant="home" />
      </main>
    </>
  );
}