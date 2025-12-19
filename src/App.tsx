import {
  Navbar,
  Hero,
  Skills,
  About,
  Experience,
  Projects,
  Contact,
  Footer,
} from "./components";

function App() {
  return (
    <div className="relative z-0 bg-slate-900">
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
