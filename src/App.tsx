import {
  Navbar,
  Hero,
  Skills,
  About,
  Education,
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
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
