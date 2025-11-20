//Theme Toggle (Dark/Light Mode)
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.querySelector('.nav-circlebtn');
  function setTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    if (themeBtn) {
      const icon = themeBtn.querySelector('.theme-icon');
      if (icon) {
        icon.src = dark ? 'Images/sun.png' : 'Images/moon.png';
        icon.alt = dark ? 'Sun' : 'Moon';
      }
    }
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }
  if (localStorage.getItem('portfolio-theme') === 'dark') setTheme(true);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(!document.body.classList.contains('dark-theme'));
    });
  }

//Section Fade-In Animation
  const fadeElements = document.querySelectorAll('section, section *:not(script)');
  fadeElements.forEach(el => el.classList.add('fade-section'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => observer.observe(el));


//Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav_links a');
  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 100;
      const sectionBottom = sectionTop + sec.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = sec.id;
      }
    });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      current = sections[sections.length - 1].id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});