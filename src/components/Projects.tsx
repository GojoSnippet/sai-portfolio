import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="card-dark h-100 overflow-hidden border-0">
          {project.image_url && (
            <div
              className="position-relative overflow-hidden"
              style={{ height: "280px" }}
            >
              <img
                src={project.image_url}
                alt={project.name}
                className="w-100 h-100 object-fit-cover"
                style={{
                  filter: "brightness(0.8)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "brightness(1)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(0.8)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                className="position-absolute bottom-0 start-0 m-3"
              >
                <span
                  className="badge px-3 py-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#1e293b",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    borderRadius: "6px",
                  }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          )}

          <Card.Body className="p-4">
            <Card.Title className="text-white fs-5 fw-bold mb-3">
              {project.name}
            </Card.Title>
            <Card.Text
              className="text-gray-400 mb-4"
              style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
            >
              {project.description}
            </Card.Text>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="badge"
                  style={{
                    background: "rgba(99, 102, 241, 0.1)",
                    color: "#a5b4fc",
                    fontSize: "0.7rem",
                    fontWeight: "500",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center pt-3 border-top border-slate-700">
              {project.live_demo ? (
                <a
                  href={project.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-flex align-items-center gap-2 fw-medium"
                  style={{
                    color: "#6366f1",
                    fontSize: "0.85rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6366f1")}
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
                </a>
              ) : (
                <span className="text-gray-500" style={{ fontSize: "0.85rem" }}>
                  Coming soon
                </span>
              )}

              <div className="d-flex gap-2">
                {project.source_code && (
                  <a
                    href={project.source_code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400"
                    style={{ transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-5 bg-gradient-slate">
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <p
            className="text-uppercase mb-2"
            style={{
              color: "#ef4444",
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "0.15em",
            }}
          >
            ACHIEVEMENTS
          </p>
          <h2 className="section-title mb-4">
            <span style={{ color: "#1e293b" }}>PROJECTS</span>
          </h2>
          <p className="text-gray-600 fs-6 mx-auto mb-5" style={{ maxWidth: "48rem" }}>
            Here are examples of websites and web applications developed for my clients.
            Not everything is visible, nor are all projects publicly available. If you want to see
            more projects, check my social media profiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="d-flex justify-content-center gap-3 mb-5"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="btn px-4 py-2 fw-medium"
              style={{
                background:
                  selectedCategory === category
                    ? "#6366f1"
                    : "rgba(99, 102, 241, 0.1)",
                color: selectedCategory === category ? "#fff" : "#6366f1",
                border:
                  selectedCategory === category
                    ? "none"
                    : "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "8px",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Row xs={1} md={2} lg={3} className="g-4 mb-5">
              {currentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </Row>

            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="d-flex justify-content-center align-items-center gap-3 mt-5"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn d-flex align-items-center gap-2 px-4 py-2"
                  style={{
                    background: currentPage === 1 ? "rgba(99, 102, 241, 0.1)" : "#6366f1",
                    color: currentPage === 1 ? "#6366f1" : "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="text-gray-600 fw-medium" style={{ fontSize: "0.9rem" }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="btn d-flex align-items-center gap-2 px-4 py-2"
                  style={{
                    background: currentPage === totalPages ? "rgba(99, 102, 241, 0.1)" : "#6366f1",
                    color: currentPage === totalPages ? "#6366f1" : "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Next
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Projects;
