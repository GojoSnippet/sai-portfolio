import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { supabase } from "../lib/supabase";

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  image_url: string | null;
  source_code: string | null;
  live_demo: string | null;
  order: number;
}

const categories = ["All", "Data", "Backend", "ML"];

const PROJECTS_PER_PAGE = 3;

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <Col>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8 }}
      >
        <Card className="card-dark h-100 overflow-hidden border-0">
          {project.image_url && (
            <motion.div
              className="position-relative overflow-hidden project-card-image"
              style={{ height: "260px" }}
            >
              <motion.img
                src={project.image_url}
                alt={project.name}
                className="w-100 h-100 object-fit-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ filter: "brightness(0.85)" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                className="position-absolute bottom-0 start-0 m-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span
                  className="badge px-3 py-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#0f172a",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    borderRadius: "8px",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {project.category}
                </span>
              </motion.div>
            </motion.div>
          )}

          <Card.Body className="p-4">
            <Card.Title
              className="text-white mb-3"
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </Card.Title>
            <Card.Text
              className="text-slate-400 mb-4"
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.7",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </Card.Text>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="tag-badge"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div
              className="d-flex justify-content-between align-items-center pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {project.live_demo ? (
                <motion.a
                  href={project.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-flex align-items-center gap-2 fw-semibold"
                  style={{
                    color: "#38bdf8",
                    fontSize: "0.9rem",
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Visit website
                  <svg
                    width="14"
                    height="14"
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
                </motion.a>
              ) : (
                <span className="text-slate-500" style={{ fontSize: "0.9rem" }}>
                  Coming soon
                </span>
              )}

              <div className="d-flex gap-3">
                {project.source_code && (
                  <motion.a
                    href={project.source_code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [selectedCategory, projects]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="projects" className="py-5 bg-gradient-slate">
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
            ACHIEVEMENTS
          </motion.p>
          <h2 className="section-title mb-3">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="section-divider" />
          <motion.p
            className="mx-auto mb-5 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              maxWidth: "48rem",
              color: "#94a3b8",
              fontSize: "1.05rem",
              lineHeight: "1.7",
            }}
          >
            Here are examples of websites and web applications I've developed.
            Not everything is visible, nor are all projects publicly available.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="d-flex justify-content-center flex-wrap gap-3 mb-5"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'filter-btn-active' : 'filter-btn-inactive'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(14, 165, 233, 0.2)",
                borderTopColor: "#0ea5e9",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <Row xs={1} md={2} lg={3} className="g-4 mb-5" key={selectedCategory + currentPage}>
                {currentProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </Row>
            </AnimatePresence>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="d-flex justify-content-center align-items-center gap-4 mt-5"
              >
                <motion.button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn d-flex align-items-center gap-2 px-4 py-2"
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  style={{
                    background: currentPage === 1
                      ? "rgba(14, 165, 233, 0.1)"
                      : "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                    color: currentPage === 1 ? "#64748b" : "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    boxShadow: currentPage === 1 ? "none" : "0 4px 15px rgba(14, 165, 233, 0.3)",
                  }}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </motion.button>

                <div className="d-flex align-items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className="btn p-0"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: currentPage === i + 1 ? "32px" : "10px",
                        height: "10px",
                        borderRadius: "5px",
                        background: currentPage === i + 1
                          ? "linear-gradient(90deg, #0ea5e9, #14b8a6)"
                          : "#cbd5e1",
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="btn d-flex align-items-center gap-2 px-4 py-2"
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  style={{
                    background: currentPage === totalPages
                      ? "rgba(14, 165, 233, 0.1)"
                      : "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                    color: currentPage === totalPages ? "#64748b" : "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    boxShadow: currentPage === totalPages ? "none" : "0 4px 15px rgba(14, 165, 233, 0.3)",
                  }}
                >
                  Next
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Projects;
