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
      {/* Single animated wrapper - ZooZoo pushes everything from right to center */}
      <motion.div
        className="about-push-wrapper"
        initial={{ x: "100vw" }}
        animate={isInView ? { x: 0 } : { x: "100vw" }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Content Container */}
        <Container className="py-5 about-content-container">
          {/* Section Header */}
          <div className="text-center mb-5">
            <h2 className="section-title mb-3">
              About <span className="text-indigo-300">Me</span>
            </h2>
            <div className="section-divider" />
          </div>

          <Row className="g-5 align-items-start">
            {/* Description */}
            <Col lg={6}>
              <div>
                {aboutContent.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-300 fs-5 lh-lg mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </Col>

            {/* Skills */}
            <Col lg={6}>
              <div>
                <h3 className="text-white fs-4 fw-semibold mb-4">
                  Technologies I work with
                </h3>
                <div className="d-flex flex-wrap gap-2">
                  {aboutContent.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* ZooZoo positioned on the right side, pushing the content */}
        <div className="about-zoozoo-pusher">
          <AboutCanvas isInView={isInView} />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
