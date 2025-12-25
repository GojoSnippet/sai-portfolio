import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import { heroContent } from "../constants";
import HeroCanvas from "./canvas/HeroCanvas";

const Hero = () => {
  return (
    <section className="hero-section bg-hero-gradient">
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <HeroCanvas />
      </div>

      <div className="position-relative z-10 hero-content-wrapper">
        <Container>
          <div className="hero-content" style={{ maxWidth: '520px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="hero-chip">
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                  }}
                />
                {heroContent.greeting}
              </span>
            </motion.div>

            <motion.h1
              className="hero-title mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <TypeAnimation
                sequence={[
                  "Hi, I'm Sai",
                  2500,
                  "",
                  500,
                ]}
                speed={50}
                deletionSpeed={30}
                cursor={true}
                repeat={Infinity}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="hero-description mt-4"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="d-flex flex-wrap gap-3 align-items-center mt-5"
            >
              <motion.a
                href="#contact"
                className="btn-primary-custom text-decoration-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Contact Me</span>
              </motion.a>
              <motion.a
                href="#projects"
                className="hero-link"
                whileHover={{ x: 4 }}
              >
                Explore My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  &rarr;
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </Container>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="scroll-dot"
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
