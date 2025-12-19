import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { aboutContent } from "../constants";

const About = () => {
  return (
    <section id="about" className="py-5 bg-gradient-indigo-slate">
      <Container className="py-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="section-title mb-3">
            About <span className="text-indigo-300">Me</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <Row className="g-5 align-items-start">
          {/* Description */}
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {aboutContent.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-300 fs-5 lh-lg mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </motion.div>
          </Col>

          {/* Skills */}
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white fs-4 fw-semibold mb-4">
                Technologies I work with
              </h3>
              <div className="d-flex flex-wrap gap-2">
                {aboutContent.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
