document.addEventListener('DOMContentLoaded', function(){
  /* функция для кнопки скрола наверх */
  window.onscroll = function() {scrollFunction()}

  function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      document.getElementById('btn-up').style.display = 'block';
    }
    else {
      document.getElementById('btn-up').style.display = 'none';
    }
  }
  /* ----------------------------------------------- */

  /* функция для расчета высоты карточек */
  const productCardContainers = document.querySelectorAll('.product-card-pork');
  const productCardContents = document.querySelectorAll('.product__content');
  const productCardNames = document.querySelectorAll('.product-name');
  let widthViewport = 0;
  let cardsHeightArray = [];
  let namesHeightArray = [];
  let maxCardHeight;
  let maxProductNameHeight;

  const checkingWidth = () => {
    widthViewport = document.documentElement.clientWidth;
      if (widthViewport > 320) {
        heightCard();
      }
      else if ((widthViewport <= 320)) {
        heightCardMobile();
      }
  }

  const heightCard = () =>{
    productCardNames.forEach(name => {
      namesHeightArray.push(name.offsetHeight)
    });

    maxProductNameHeight = Math.max(...namesHeightArray);

    if (maxProductNameHeight >= 170) {

      productCardContents.forEach(content => {
        cardsHeightArray.push(content.offsetHeight);
      })

      maxCardHeight = Math.max(...cardsHeightArray);

      if (maxCardHeight <= 300) {
        return
      }
      else {
        productCardContainers.forEach(container => {
          container.style.height = maxCardHeight + 'px';
        })

        productCardContents.forEach(content => {
          content.style.height = maxCardHeight + 'px'; 
        })
      }
      
      cardsHeightArray = [];
      maxCardHeight = 0;
    }

    else {
      productCardContents.forEach(content => {
        if (content.style.height !== '') {
          content.style.height = '';
        } 
      })

      productCardContainers.forEach(container => {
        if (container.style.height !=='') {
          container.style.height = '';
        }
      })
    }

    namesHeightArray = [];
    maxProductNameHeight = 0;
  }

  const heightCardMobile = () =>{
    productCardNames.forEach(name => {
      namesHeightArray.push(name.offsetHeight)
    });

    maxProductNameHeight = Math.max(...namesHeightArray);

    if (maxProductNameHeight >= 128) {

      productCardContents.forEach(content => {
        cardsHeightArray.push(content.offsetHeight);
      })

      maxCardHeight = Math.max(...cardsHeightArray);

      if (maxCardHeight <= 230) {
        return
      }
      else {
        productCardContainers.forEach(container => {
          container.style.height = maxCardHeight + 'px';
        })

        productCardContents.forEach(content => {
          content.style.height = maxCardHeight + 'px'; 
        })
      }
      
      cardsHeightArray = [];
      maxCardHeight = 0;
    }

    else {
      productCardContents.forEach(content => {
        if (content.style.height !== '') {
          content.style.height = '';
        } 
      })

      productCardContainers.forEach(container => {
        if (container.style.height !=='') {
          container.style.height = '';
        }
      })
    }

    namesHeightArray = [];
    maxProductNameHeight = 0;
  }
  checkingWidth();

  window.addEventListener('resize', checkingWidth)
  /* ----------------------------------------------- */

  /* Табы для секции "Меню" */
  document.querySelectorAll('.step-link').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click',function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function(tabContent){
        tabContent.classList.remove('tab-content-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    });
  });

  const tabLinks = document.querySelectorAll('.step-link');

  tabLinks.forEach(item =>{
    item.addEventListener('click', (e) =>{
      tabLinks.forEach(el => {
        el.classList.remove('tab-active');
      });
      item.classList.add('tab-active')
    });
  });
  /* ----------------------------------------------- */
  
  /* Для открытия бургер меню */
  const burgerBtn = document.querySelector('.navbar-toggler');
  const burgerBtnIcons = document.querySelectorAll('.navbar-toggler-icon');
  const navBarContainer = document.querySelector('.navbar-collapse');
  const navLink = document.querySelectorAll('.nav__link');

  burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('active')) {
      burgerBtn.classList.remove('active')

      burgerBtnIcons.forEach((icon)=>{
        icon.classList.remove('active');
      })

      return
    }
    else {
      burgerBtn.classList.add('active');

      burgerBtnIcons.forEach((icon)=>{
        icon.classList.add('active');
      })
    }

  })

  navLink.forEach(link => {
    link.addEventListener('click', () =>{
      if (burgerBtn.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        navBarContainer.classList.remove('show')

        burgerBtnIcons.forEach((icon)=>{
          icon.classList.remove('active');
        })
      }
    })
  })
  
  /* ----------------------------------------------- */
})
