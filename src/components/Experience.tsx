import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { experiences } from "../constants";

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true }}
      className="timeline-item"
      whileHover={{ x: 8 }}
    >
      <div className="timeline-line" />
      <motion.div
        className="timeline-dot"
        style={{ backgroundColor: experience.iconBg }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.2 + 0.2, duration: 0.4, type: "spring" }}
        viewport={{ once: true }}
      />

      <motion.div
        className="card-dark p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="d-flex align-items-start gap-3 mb-3">
          <motion.div
            className="rounded-2xl d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '3.5rem',
              height: '3.5rem',
              background: `linear-gradient(135deg, ${experience.iconBg}30, ${experience.iconBg}10)`,
              fontSize: '1.75rem',
              borderRadius: '16px',
            }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {experience.icon}
          </motion.div>
          <div className="flex-grow-1 min-w-0 overflow-hidden">
            <h3
              className="text-white mb-1"
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {experience.company}
            </h3>
            <p
              className="text-primary-300 mb-1"
              style={{
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              {experience.title}
            </p>
            <p
              className="text-slate-500 mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              {experience.date}
            </p>
          </div>
        </div>
        <p
          className="text-slate-400 mb-0"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.7",
          }}
        >
          {experience.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-5 bg-slate-950">
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <motion.p
            className="text-uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              color: "#0ea5e9",
              fontSize: "0.8rem",
              fontWeight: "700",
              letterSpacing: "0.2em",
            }}
          >
            MY JOURNEY
          </motion.p>
          <h2 className="section-title mb-3">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="d-flex justify-content-center">
          <div className="position-relative" style={{ maxWidth: '52rem', width: '100%' }}>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;
