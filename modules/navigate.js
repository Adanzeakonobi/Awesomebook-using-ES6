const sections = document.querySelectorAll('.section-con');

const displayActive = (className) => {
  sections.forEach((section) => (section.classList.contains(className)
    ? section.classList.add('active')
    : section.classList.remove('active')));
};

export default displayActive;
