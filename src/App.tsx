import {
  Navbar,
  Hero,
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
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
