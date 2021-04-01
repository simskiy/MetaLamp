
document.querySelector('.pagination__list').addEventListener('click', (e) => {
  if (!e.target.classList.contains('pagination__link--next')) {
    document.querySelectorAll('.pagination__link').forEach(item => {
      item.classList.remove('pagination__link--current');
      e.target.classList.add('pagination__link--current');
    })
  }
})
