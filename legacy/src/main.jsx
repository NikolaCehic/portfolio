// Mount all sections
const rootHero = ReactDOM.createRoot(document.getElementById('hero-mount'));
rootHero.render(<Hero />);

const rootAbout = ReactDOM.createRoot(document.getElementById('about-mount'));
rootAbout.render(<About />);

const rootSkills = ReactDOM.createRoot(document.getElementById('skills-mount'));
rootSkills.render(<Skills />);

const rootMq = ReactDOM.createRoot(document.getElementById('marquee-mount'));
rootMq.render(<TechMarquee />);

const rootExp = ReactDOM.createRoot(document.getElementById('experience-mount'));
rootExp.render(<Experience />);

const rootContact = ReactDOM.createRoot(document.getElementById('contact-mount'));
rootContact.render(<Contact />);

// Smooth-scroll on nav clicks
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  });
});
