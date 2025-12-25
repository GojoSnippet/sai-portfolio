import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Form } from "react-bootstrap";
import { contactContent, socialLinks } from "../constants";

const socialLinksData = [
  {
    href: `mailto:${socialLinks.email}`,
    icon: (
      <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: socialLinks.email,
    external: false,
  },
  {
    href: socialLinks.linkedin,
    icon: (
      <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "Connect with me",
    external: true,
  },
  {
    href: socialLinks.github,
    icon: (
      <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "Check my code",
    external: true,
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  const getButtonText = () => {
    if (loading) return "Sending...";
    if (success) return "Message Sent!";
    return "Send Message";
  };

  return (
    <section id="contact" className="py-5 bg-gradient-slate-reverse">
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <motion.p
            className="text-uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              color: "#0ea5e9",
              fontSize: "0.8rem",
              fontWeight: "700",
              letterSpacing: "0.2em",
            }}
          >
            CONTACT
          </motion.p>
          <h2 className="section-title mb-3">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <motion.p
            className="text-slate-400 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              maxWidth: '36rem',
              fontSize: "1.1rem",
              lineHeight: "1.7",
            }}
          >
            {contactContent.description}
          </motion.p>
          <div className="section-divider mt-4" />
        </motion.div>

        <Row className="g-5">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="mb-5">
                <h3
                  className="text-white mb-4"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Let's work together
                </h3>
                <p
                  className="text-slate-400"
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: "1.8",
                  }}
                >
                  I'm currently looking for new opportunities in software
                  engineering. If you're interested in working together or just
                  want to chat about tech, feel free to reach out!
                </p>
              </div>

              <div className="d-flex flex-column gap-3">
                {socialLinksData.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="social-link"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <div className="social-icon">{link.icon}</div>
                    <div>
                      <p className="text-slate-500 small mb-0" style={{ fontSize: "0.8rem" }}>
                        {link.label}
                      </p>
                      <p className="text-white mb-0" style={{ fontWeight: "500" }}>
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <Form ref={formRef} onSubmit={handleSubmit} className="card-dark p-4 p-md-5">
                <Form.Group className="mb-4">
                  <Form.Label
                    className="text-slate-400"
                    style={{ fontSize: "0.9rem", fontWeight: "500" }}
                  >
                    Your Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-control-dark"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label
                    className="text-slate-400"
                    style={{ fontSize: "0.9rem", fontWeight: "500" }}
                  >
                    Your Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="form-control-dark"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label
                    className="text-slate-400"
                    style={{ fontSize: "0.9rem", fontWeight: "500" }}
                  >
                    Your Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Hi Sai, I'd like to discuss..."
                    className="form-control-dark"
                    style={{ resize: 'none' }}
                  />
                </Form.Group>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn btn-indigo w-100"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {getButtonText()}
                </motion.button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
