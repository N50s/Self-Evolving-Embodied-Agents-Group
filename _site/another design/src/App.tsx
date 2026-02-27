import { Navbar } from './components/custom/Navbar';
import { Hero } from './sections/Hero';
import { ResearchAreas } from './sections/ResearchAreas';
import { News } from './sections/News';
import { Publications } from './sections/Publications';
import { Team } from './sections/Team';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ResearchAreas />
        <News />
        <Publications />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
