import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { projects } from "../constants";

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  return (
    <Col>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="card-dark h-100 overflow-hidden">
          {/* Project Header */}
          <div
            className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
            style={{
              height: '11rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))'
            }}
          >
            <div
              className="rounded-2xl d-flex align-items-center justify-content-center"
              style={{
                width: '4rem',
                height: '4rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <svg
                style={{ width: '2rem', height: '2rem', color: 'rgba(255, 255, 255, 0.8)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <Card.Body className="p-4">
            <Card.Title className="text-white fs-5 fw-semibold mb-3">
              {project.name}
            </Card.Title>
            <Card.Text className="text-gray-400 small lh-lg mb-4 line-clamp-3">
              {project.description}
            </Card.Text>

            {/* Tags */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="d-flex gap-4 pt-3 border-top border-slate-700">
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-decoration-none d-flex align-items-center gap-2 small fw-medium transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-decoration-none d-flex align-items-center gap-2 small fw-medium transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <svg
                    style={{ width: '1.25rem', height: '1.25rem' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-5 bg-gradient-slate">
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
            My <span className="text-indigo-400">Projects</span>
          </h2>
          <p className="text-gray-400 fs-5 mx-auto" style={{ maxWidth: '36rem' }}>
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience.
          </p>
          <div className="section-divider mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
