
document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    }

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));

      const buttons = this.menu.querySelectorAll('[data-modal]')
      if (buttons.length) {
        buttons.forEach(el => {
          el.addEventListener('click', this.closeMenu.bind(this))
        })
      }
      
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('menu--open');
      this.button.classList.remove('menu-button--active');
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector('header');

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener('scroll', handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  }

  if (xl.matches) {
    scrollAdd();
    document.removeEventListener('scroll', scrollHeader);
  } else {
    document.addEventListener('scroll', scrollHeader);
    scrollRemove();
  }

  xl.addEventListener('change', () => {
    if (xl.matches) {
      document.removeEventListener('scroll', scrollHeader);
      scrollAdd();
    } else {
      document.addEventListener('scroll', scrollHeader);
      scrollRemove();
    }
  });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };
    const num = xl.matches ? 50 : 100;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    };
    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else {
      if (currentScrollPos > num) {
        header.classList.add('out');
      }
    };
    prevScrollpos = currentScrollPos;
  };

  function initHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const num = xl.matches ? 50 : 150;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  }

  initHeader();

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2);
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  const worksWrappers = document.querySelectorAll('.works-swiper-wrapper');

  if (worksWrappers.length) {
    worksWrappers.forEach(el => {
      const swiper = el.querySelector('.works-swiper');
      const next = el.querySelector('.next');
      const prev = el.querySelector('.prev');
      if (swiper) {
        new Swiper(swiper, {
          loop: true,
          slidesPerView: 'auto',
          speed: 400,
          grabCursor: true,
          autoplay: {
            delay: 5000,
          },
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
        })
      }

    })
  }

  const worksWrappers2 = document.querySelectorAll('.variants-swiper-wrapper');

  if (worksWrappers2.length) {
    worksWrappers2.forEach(el => {
      const swiper = el.querySelector('.variants-swiper');
      if (swiper) {
        new Swiper(swiper, {
          loop: true,
          slidesPerView: 'auto',
          speed: 400,
          grabCursor: true,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
          },
          navigation: {
            nextEl: '.next',
            prevEl: '.prev',
          },
        })
      }

    })
  }

  const ourWorksSwipers = document.querySelectorAll('.ourWork-swiper-wrapper');

  if (ourWorksSwipers.length) {
    ourWorksSwipers.forEach(el => {
      const swiper = el.querySelector('.ourWork-swiper');
      const slides = el.querySelectorAll('.swiper-slide');
      const next = el.querySelector('.next');
      const prev = el.querySelector('.prev');
      if (slides.length > 1) {
        new Swiper(swiper, {
          loop: slides.length,
          slidesPerView: 'auto',
          speed: 400,
          grabCursor: true,
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
        })
      } else {
        next.hidden = true;
        prev.hidden = true;
      }
    })
  }

  function addMask() {
    [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        this.parentElement.classList.remove('error')
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

    });

  }
  addMask()

  const accordion = document.querySelectorAll('.accordion-button, .ourWork-accordion-button');

  if (accordion.length) {
    accordion.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('active');
      })
    })
  }

  const fileInput = document.querySelector(".input-file"),
    button = document.querySelector(".input-file-trigger"),
    the_return = document.querySelector(".file-return");

  if (fileInput && button && the_return) {
    button.addEventListener("keydown", function (event) {
      if (event.keyCode == 13 || event.keyCode == 32) {
        fileInput.focus();
      }
    });
    button.addEventListener("click", function () {
      fileInput.focus();
      return false;
    });
    fileInput.addEventListener("change", function () {
      const files = [];
      for (let file of this.files) {
        files.push(`<span class="filename">${file.name} </span>`);
      }
      the_return.innerHTML = files.join('');
    });
  }

  AOS.init({
    disable: function disable() {
      return xl.matches;
    }
  });

  xl.addEventListener('change', () => {
    AOS.init({
      disable: function disable() {
        return xl.matches;
      }
    });
  })

  const scrolledObj = document.querySelectorAll('[data-scroll]');

  if (scrolledObj.length) {
    scrolledObj.forEach(el => {
      el.addEventListener('click', function () {
        const sc = document.querySelector(this.dataset.scroll)
        if (sc) {
          const header = document.querySelector('header');
          let headerH = null;
          if (header) {
            headerH = header.getBoundingClientRect().height;
          }
          const yOffset = headerH ? -headerH : -200;
          const onMedia = xl.matches ? 0 : 50;
          const y = sc.getBoundingClientRect().top + window.pageYOffset + yOffset - onMedia;

          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      })
    })
  }

  const btn = document.querySelector('.backToTop');

  if (btn) {
    document.addEventListener('scroll', btnHandler);

    btn.addEventListener('click', function () {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })

  }

  function btnHandler() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };



    if (currentScrollPos >= 300) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    };
    prevScrollpos = currentScrollPos;
  }

  const ourWorkButtons = document.querySelectorAll('.ourWork-button');

  if (ourWorkButtons.length) {
    ourWorkButtons.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
          disableScroll();
        } 
      })
    })
  }

  const ourWorksClose = document.querySelectorAll('.ourWork-close');

  if (ourWorksClose.length) {
    ourWorksClose.forEach(el => {
      el.addEventListener('click', function () {
        const parent = this.closest('.ourWork-overlay');

        if (parent) {
          parent.style.opacity = 0;
          setTimeout(() => {
            parent.style.opacity = null;
            parent.previousElementSibling.classList.remove('active');
            enableScroll();
          }, 300)

        }
      })
    })
  }

  const ourWorkBtns = document.querySelectorAll('.ourWork-btn');
  if (ourWorkBtns.length) {
    ourWorkBtns.forEach(el => {
      const parent = el.parentElement.parentElement.parentElement;
      el.addEventListener('click', function () {
        if (parent) {
          parent.style.opacity = 0;
          setTimeout(() => {
            parent.style.opacity = null;
            parent.previousElementSibling.classList.remove('active');
          }, 300)
        }
      })
    })
  }

  const ourWorksOverlays = document.querySelectorAll('.ourWork-overlay');

  if (ourWorksOverlays.length) {
    ourWorksOverlays.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('ourWork-overlay')) {
          this.style.opacity = 0;
          setTimeout(() => {
          this.style.opacity = null;
          this.previousElementSibling.classList.remove('active');
          enableScroll();
          }, 300)

        }
      })
    })
  }

  const reviewsTwoColumn = document.querySelector('.reviews-list-two-column');

  if (reviewsTwoColumn) {
    const oneColumn = document.createElement('ul');
    oneColumn.classList.add('reviews-list-one-column');
    reviewsTwoColumn.parentElement.appendChild(oneColumn);

    const lists = reviewsTwoColumn.querySelectorAll('ul');
    const items = reviewsTwoColumn.querySelectorAll('li');
    const newArr = [];

    items.forEach((el, i) => {
      lists.forEach(el=> {
        if (el.children[i]) {
          newArr.push(el.children[i])
        }
      })
    })

    newArr.forEach(el => {
      oneColumn.appendChild(el.cloneNode(true))
    })
  }

  const articlesButtons = document.querySelectorAll('.articles-button');

  if (articlesButtons.length) {
    articlesButtons.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
          this.previousElementSibling.style.maxHeight = this.previousElementSibling.scrollHeight + 'px';
        } else {
          this.previousElementSibling.style.maxHeight = null;
        }
      })
    })
  }

  const articlesWrapper = document.querySelectorAll('.articles-float-content');

  if (articlesWrapper.length) {
    articlesWrapper.forEach(el => {
      if (el.scrollHeight <= el.offsetHeight) {
        const btn = el.nextElementSibling;
        if (btn.classList.contains('articles-button')) {
          btn.hidden = true;
        }
      }
    })
  }

  window.addEventListener('resize', () => {
    const maxHeight = document.querySelectorAll("[style*='max-height']");

    if (maxHeight.length) {
      maxHeight.forEach(el => {
        if (el.classList.contains('articles-float-content')) {
          el.style.maxHeight = el.scrollHeight + 'px';
        }
      })
    }
  })

  const absoluteImg = document.querySelectorAll('.articles-float .absolute');

  if (absoluteImg.length) {
    absoluteImg.forEach(el => {
      if (el.nextElementSibling.classList.contains('articles-float-content')) {
        el.nextElementSibling.insertAdjacentHTML('afterBegin', el.innerHTML)
      }
    })
  }

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }
  
  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10);
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null);
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition);
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal');

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this);
        }
      });
      const closeButton = el.querySelectorAll('.close-button');
      if (closeButton.length) {
        closeButton.forEach(button => {
          button.addEventListener('click', () => {
            modalHandler.apply(el);
          });
        })
      }
    });
  }


  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  document.addEventListener('click', () => {
    const dataModal = event.target.closest('[data-modal]');
    if (dataModal) {
      modalHandler.apply(dataModal);
    }
  })

});











