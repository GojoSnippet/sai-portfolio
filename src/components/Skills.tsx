const skills = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/ffffff" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ffffff" },
  { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot/ffffff" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/ffffff" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/ffffff" },
  { name: "Kafka", icon: "https://cdn.simpleicons.org/apachekafka/ffffff" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/ffffff" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/ffffff" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/ffffff" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/ffffff" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/ffffff" },
];

const Skills = () => {
  return (
    <section className="skills-section">
      <div className="skills-marquee">
        <div className="skills-track">
          {/* First set */}
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {skills.map((skill) => (
            <div key={`${skill.name}-dup`} className="skill-item">
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
