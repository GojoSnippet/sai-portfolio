import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { aboutContent } from "../constants";
import AboutCanvas from "./canvas/AboutCanvas";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="about-section position-relative overflow-hidden">
      <motion.div
        className="about-push-wrapper"
        initial={{ x: "100vw" }}
        animate={isInView ? { x: 0 } : { x: "100vw" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container className="py-5 about-content-container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title mb-3">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="section-divider" />
          </motion.div>

          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div>
                {aboutContent.description.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-slate-200 mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      delay: 0.7 + index * 0.2,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      fontSize: "1.15rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        <div className="about-zoozoo-pusher">
          <AboutCanvas isInView={isInView} />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
