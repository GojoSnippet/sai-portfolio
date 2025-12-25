import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { supabase } from "../lib/supabase";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description: string;
  gpa: string | null;
  location: string | null;
  icon: string;
  icon_bg: string;
  order: number;
}

const EducationCard = ({
  education,
  index,
}: {
  education: EducationItem;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="card-dark p-4 h-100"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="d-flex align-items-start gap-3 mb-3">
          <motion.div
            className="rounded-2xl d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '4rem',
              height: '4rem',
              background: `linear-gradient(135deg, ${education.icon_bg}40, ${education.icon_bg}15)`,
              fontSize: '2rem',
              borderRadius: '16px',
              border: `2px solid ${education.icon_bg}30`,
            }}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {education.icon}
          </motion.div>
          <div className="flex-grow-1">
            <h3
              className="text-white mb-1"
              style={{
                fontSize: "1.35rem",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {education.institution}
            </h3>
            {education.location && (
              <p
                className="text-slate-500 mb-2"
                style={{ fontSize: "0.85rem" }}
              >
                📍 {education.location}
              </p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <p
            className="text-primary-300 mb-1"
            style={{
              fontWeight: "600",
              fontSize: "1.05rem",
            }}
          >
            {education.degree}
          </p>
          <p
            className="text-slate-400 mb-1"
            style={{ fontSize: "0.9rem" }}
          >
            {education.field}
          </p>
          <div className="d-flex align-items-center gap-3 mt-2">
            <p
              className="text-slate-500 mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              {education.start_date} - {education.end_date}
            </p>
            {education.gpa && (
              <span
                className="px-2 py-1"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  color: "#4ade80",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  borderRadius: "6px",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                GPA: {education.gpa}
              </span>
            )}
          </div>
        </div>

        <p
          className="text-slate-400 mb-0"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.7",
          }}
        >
          {education.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setEducation(data || []);
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="education" className="py-5 bg-slate-900">
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
            ACADEMIC BACKGROUND
          </motion.p>
          <h2 className="section-title mb-3">
            <span className="text-gradient">Education</span>
          </h2>
          <div className="section-divider" />
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
          <Row xs={1} md={2} className="g-4">
            {education.map((edu, index) => (
              <Col key={edu.id}>
                <EducationCard education={edu} index={index} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Education;
