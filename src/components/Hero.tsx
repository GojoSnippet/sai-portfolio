import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import { heroContent } from "../constants";
import HeroCanvas from "./canvas/HeroCanvas";

const Hero = () => {
  return (
    <section className="hero-section bg-hero-gradient">
      {/* 3D Canvas - absolute background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <HeroCanvas />
      </div>

      {/* Content overlay */}
      <div className="position-relative z-10 hero-content-wrapper">
        <Container>
          <div className="hero-content" style={{ maxWidth: '480px' }}>
            {/* Greeting chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="hero-chip">
                {heroContent.greeting}
              </span>
            </motion.div>

            {/* Main heading with typing animation */}
            <h1 className="hero-title mt-4">
              <TypeAnimation
                sequence={[
                  "Hi, I'm Sai",
                  2000,
                  "",
                  500,
                ]}
                speed={50}
                deletionSpeed={30}
                cursor={true}
                repeat={Infinity}
              />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hero-description mt-4"
            >
              {heroContent.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="d-flex flex-wrap gap-3 align-items-center mt-4"
            >
              <a href="#contact" className="btn-primary-custom text-decoration-none">
                Contact Me
              </a>
              <a href="#projects" className="hero-link">
                Explore My Work →
              </a>
            </motion.div>

          </div>
        </Container>
      </div>

    </section>
  );
};

export default Hero;
