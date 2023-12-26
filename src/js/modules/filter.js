const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
    items = menu.querySelectorAll('li'),
    wrapper = document.querySelector('.portfolio-wrapper'),
    markAll = wrapper.querySelectorAll('.all'),
    no = document.querySelector('.container .portfolio-no');

  const typeFilter = (markType) => {
    markAll.forEach((mark) => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (markType.length > 0) {
			console.log('markType', markType);
      markType.forEach((mark) => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  const filter = (target) => {
    const targetClass = target.classList[0];
    const markType = wrapper.querySelectorAll(`.${targetClass}`);

    typeFilter(markType);
  };

  menu.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.tagName === 'LI') {
      items.forEach((item) => item.classList.remove('active'));
      target.classList.add('active');
      filter(target);
    }
  });
};

export default filter;
