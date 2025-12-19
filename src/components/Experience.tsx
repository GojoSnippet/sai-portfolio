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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="timeline-item"
    >
      {/* Timeline line */}
      <div className="timeline-line" />

      {/* Timeline dot */}
      <div className="timeline-dot" style={{ backgroundColor: experience.iconBg }} />

      {/* Content */}
      <div className="card-dark p-4">
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="rounded-xl d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: `${experience.iconBg}20`,
              fontSize: '1.5rem'
            }}
          >
            {experience.icon}
          </div>
          <div className="flex-grow-1 min-w-0 overflow-hidden">
            <h3 className="text-white fs-5 fw-semibold mb-1">{experience.company}</h3>
            <p className="text-indigo-400 fw-medium small mb-1">{experience.title}</p>
            <p className="text-gray-500 small">{experience.date}</p>
          </div>
        </div>
        <p className="text-gray-400 small lh-lg mb-0">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-5 bg-slate-900">
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
            Professional <span className="text-indigo-400">Experience</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className="d-flex justify-content-center">
          <div className="position-relative" style={{ maxWidth: '48rem' }}>
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
