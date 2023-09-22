document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    document.querySelectorAll('.faq-answer').forEach(a => {
      if (a !== answer) {
        a.classList.remove('show');
      }
    });
    answer.classList.toggle('show');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggleIcon = question.querySelector('.toggle-icon');

      question.addEventListener('click', function() {
          answer.classList.toggle('visible');
          toggleIcon.textContent = toggleIcon.textContent === '▼' ? '▲' : '▼';
      });
  });
});