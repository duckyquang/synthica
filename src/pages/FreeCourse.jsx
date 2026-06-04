import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const modules = [
  { num: 'Module 0', title: 'Welcome to Research', desc: 'Understand what research is, what strong researchers do, and how to contribute ethically to a team.', topics: ['What is research?', 'What makes a good researcher?', 'How to properly contribute to research'], duration: 'Self-paced · Open access' },
  { num: 'Module 1', title: 'Foundations of Research Literacy', desc: 'Learn to read scholarly work critically and turn curiosity into a focused research question.', topics: ['How to read a research paper', 'How to create a research question', 'Literature search basics'], duration: 'Self-paced · Open access' },
  { num: 'Module 2', title: 'Methods & Project Design', desc: 'Plan methodology, collect and analyze data, and document your process like a practicing scientist.', topics: ['Choosing methods for your question', 'Data collection & analysis intro', 'Research notebooks & reproducibility'], duration: 'Self-paced · Open access' },
];

const FreeCourse = () => (
  <div className="free-course-page">
    <section className="page-hero">
      <Navbar />
      <div className="page-hero-content">
        <h1 className="page-hero-title">Free <span className="highlight-text">Course</span></h1>
        <p className="page-hero-subtitle">Professor-reviewed research curriculum — learn how to read papers, ask questions, and run your first project at your own pace.</p>
      </div>
    </section>

    <section className="curriculum-section" id="curriculum">
      <div className="curriculum-container">
        <div className="curriculum-header">
          <div className="section-badge">Synthica Curriculum</div>
          <h2 className="section-title">Build research skills <span className="highlight-blue">step by step</span></h2>
          <p className="section-subtitle">Every module is free. No paywalls, no prerequisites — just structured lessons designed for high school students worldwide.</p>
        </div>

        <div className="curriculum-grid">
          {modules.map((m) => (
            <div key={m.num} className="curriculum-card">
              <div className="curriculum-number">{m.num}</div>
              <h3 className="curriculum-card-title">{m.title}</h3>
              <p className="curriculum-card-desc">{m.desc}</p>
              <ul className="curriculum-topics">
                {m.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="curriculum-duration">{m.duration}</div>
            </div>
          ))}
          <div className="curriculum-card locked-module">
            <div className="curriculum-number">Module 3+</div>
            <h3 className="curriculum-card-title">Advanced Tracks</h3>
            <p className="curriculum-card-desc">Discipline-specific pathways, writing for publication, and competition prep.</p>
            <ul className="curriculum-topics">
              <li>STEM lab skills</li>
              <li>Writing & presenting results</li>
              <li>Competition & journal prep</li>
            </ul>
            <div className="curriculum-duration">Unlock in Discord</div>
            <a href="https://discord.gg/8wPzZkGy5Z" target="_blank" rel="noopener noreferrer" className="lock-overlay">
              <span className="lock-icon">🔒</span>
              <span className="unlock-text">Join Discord to unlock</span>
            </a>
          </div>
        </div>

        <div className="curriculum-cta">
          <h3 className="curriculum-cta-title">Start learning today — completely free</h3>
          <a href="https://discord.gg/8wPzZkGy5Z" target="_blank" rel="noopener noreferrer" className="cta-primary-button" style={{ display: 'inline-block', textDecoration: 'none' }}>Access on Discord</a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default FreeCourse;
