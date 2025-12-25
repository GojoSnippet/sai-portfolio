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
            className="mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-uppercase mb-3"
              style={{
                color: "#0ea5e9",
                fontSize: "0.8rem",
                fontWeight: "700",
                letterSpacing: "0.2em",
              }}
            >
              GET TO KNOW ME
            </motion.p>
            <h2 className="section-title mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
          </motion.div>

          <Row className="align-items-center">
            <Col lg={6}>
              <div className="pe-lg-4">
                {aboutContent.description.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-slate-300 mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{
                      delay: 0.7 + index * 0.15,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {paragraph.trim()}
                  </motion.p>
                ))}

                <motion.div
                  className="mt-4 d-flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  {aboutContent.skills.slice(0, 6).map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 1.2 + i * 0.05, duration: 0.3 }}
                      style={{
                        background: "rgba(14, 165, 233, 0.1)",
                        border: "1px solid rgba(14, 165, 233, 0.3)",
                        borderRadius: "8px",
                        color: "#38bdf8",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="position-relative"
                style={{ minHeight: "400px" }}
              >
                <div className="about-zoozoo-pusher">
                  <AboutCanvas isInView={isInView} />
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </section>
  );
};

export default About;
