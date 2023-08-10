for(let form of document.forms) {
  form.addEventListener('submit', function () {
    event.preventDefault();
    const callbackForm = this.closest('.callback-form');

    if (callbackForm) {
      const formWrapper = callbackForm.querySelector('.form-wrapper');
      const feedback = callbackForm.querySelector('.feedback');

      formWrapper.hidden = true;
      feedback.hidden = false;

      const header = document.querySelector('header');
      let headerH = null;
      if (header) {
        headerH = header.getBoundingClientRect().height;
      }
      const yOffset = headerH ? -headerH : -200;
      const y = feedback.getBoundingClientRect().top + window.pageYOffset + yOffset - 50;

      window.scrollTo({ top: y, behavior: 'smooth' }); 
    }
  })
}