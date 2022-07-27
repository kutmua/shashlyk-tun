document.addEventListener('DOMContentLoaded', function(){
  /* функция для кнопки скрола наверх */
  const btnUp = document.getElementById('btn-up');
  window.onscroll = () => {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      btnUp.classList.add('btn-up-visible');
    }
    else {
      btnUp.classList.remove('btn-up-visible');
    }
  }

  btnUp.onclick = (event) => {
    event.preventDefault();
    window.scrollTo(0,0);
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

  /* Добавление продуктов в корзину */
  const inBasketBtn = document.querySelectorAll('.in-basket-btn');
  const productsInBasketCount = document.querySelectorAll('.basket__count');
  const btnCleanBasket = document.querySelector('.btn-clean-basket'); 
  let productsInBasket;
  let productCard = {};
  let productsCount;

  /* checkProductsInBasket функция для проверки наличия продуктов в корзине */
  function checkProductsInBasket(){
    /* Проверка на наличие продуктов в корзине (для счетчика)*/
    if (localStorage.getItem('productsCount')) {
      productsCount = localStorage.getItem('productsCount');
  
      productsInBasketCount.forEach(count => {
        count.innerText = productsCount;
      });
    }  
    else {
      productsCount = 0;
      productsInBasketCount.forEach(count => {
        count.innerText = productsCount;
      });
    }
  
    /* Проверка на наличие продуктов в корзине (для массива продуктов)*/
    if (localStorage.getItem('productsInBasket')) {
      let arrayParse = localStorage.getItem('productsInBasket')
      productsInBasket = JSON.parse(arrayParse)
    }
    else productsInBasket = [];
  }
  checkProductsInBasket();

  /* orderInformationRender функция отрисовки продуктов в карзине */
  function orderInformationRender(){
    if (localStorage.length > 0) {
      let informationsFromLocalStorage = JSON.parse(localStorage.getItem('productsInBasket'));
      const orderInfoContainer = document.querySelector('.order-info');
      const orders = document.querySelectorAll('.order');
      const totalSum = document.querySelector('.order-info-total-sum-value');

      /* удаление продуктов, чтобы не было повторений при повторном добавлении */
      orders.forEach(order => {
        order.remove();
      })

      informationsFromLocalStorage.forEach(info => {
        /* создание элементов для отрисовки */
        const order = document.createElement('div');
        const productName = document.createElement('p');
        const productPrice = document.createElement('p');
        const productCount = document.createElement('p');
        const btnContainer = document.createElement('div');
        const btnMinus = document.createElement('a');
        const btnPlus = document.createElement('a');
        const btnTrash = document.createElement('a');
        const horizontalLineForMinus = document.createElement('div');
        const horizontalLine = document.createElement('div');
        const verticalLine = document.createElement('div');
        const svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="transparent" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4H15M5 15H11C12.1046 15 13 14.1046 13 13V3C13 1.89543 12.1046 1 11 1H5C3.89543 1 3 1.89543 3 3V13C3 14.1046 3.89543 15 5 15Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`


        /* добавление классов */
        order.classList.add('order', 'flex');
        order.dataset.id = info.id;
        productName.classList.add('order-info-product-name');
        productPrice.classList.add('order-info-product-price');
        productCount.classList.add('order-info-product-count');
        btnContainer.classList.add('order-info-btn-container', 'flex');
        btnMinus.classList.add('btn-minus');
        btnPlus.classList.add('btn-plus');
        horizontalLineForMinus.classList.add('btn-horizontal');
        horizontalLine.classList.add('btn-horizontal');
        verticalLine.classList.add('btn-vertical');
        btnTrash.classList.add('btn-trash', 'flex');

        /* перенос в дом дерево */
        btnMinus.append(horizontalLineForMinus);
        btnPlus.append(horizontalLine);
        btnPlus.append(verticalLine);
        btnTrash.innerHTML = svg;
        
        /* вызов функций плюса (plusFunc) и минуса (minusFunc) */
        btnMinus.addEventListener('click', event => {
          minusFunc(event.currentTarget.parentNode.parentNode.dataset.id)
        });
        btnPlus.addEventListener('click', event =>{
          plusFunc(event.currentTarget.parentNode.parentNode.dataset.id)
        });
        btnTrash.addEventListener('click', event => {
          deleteFunc(event.currentTarget.parentNode.dataset.id)
        })

        /* заполнение контентом */
        let price = Number(info.productPrice.slice(0,-1));
        let count = Number(info.count);
        price = price * count;

        productName.textContent = info.productName;
        productPrice.textContent = price;
        productCount.textContent = count;

        /* перенос в дом дерево */
        btnContainer.append(btnMinus);
        btnContainer.append(productCount);
        btnContainer.append(btnPlus);

        order.append(productName);
        order.append(btnContainer);
        order.append(productPrice);
        order.append(btnTrash);
        orderInfoContainer.append(order);
      })


      let totalSumValue = totalSumCounter();
      totalSum.textContent = `${totalSumValue}₽`;
    }
    else {
      const orders = document.querySelectorAll('.order');
      const totalSum = document.querySelector('.order-info-total-sum-value');

      totalSum.textContent = `0₽`;
      orders.forEach(order => {
        order.remove();
      })
    }
  }
  orderInformationRender();

  /* totalSumCounter функция подсчета полной цены */
  function totalSumCounter() {
    let sumPrice;
    if (localStorage.length > 0) {
      let sumCount = JSON.parse(localStorage.getItem('productsInBasket'));
      sumPrice = 0;

      sumCount.forEach(product => {
        let price = Number(product.productPrice.slice(0,-1));
        let quantity = Number(product.count);

        price = price * quantity;
        sumPrice += price;
        
      })
      
    }
    return sumPrice
  }

  /* minusFunc функция уменьшения продуктов в корзине */
  function minusFunc(event) {
    if (localStorage.length > 0) {
      let storageArray = JSON.parse(localStorage.getItem('productsInBasket'));

      for (let i = 0; i < storageArray.length; i++) {
        if (productsCount - 1 === 0) {
          if (storageArray[i].id === event) {
            localStorage.clear();
            checkProductsInBasket();
            orderInformationRender();
          }
        }
        else if (storageArray[i].id === event){
          if (storageArray[i].count - 1 === 0) {
            storageArray.splice(i,1);
            localStorage.setItem('productsInBasket', JSON.stringify(storageArray));
            productsInBasket = storageArray;
            orderInformationRender();

            productsCount--;
            localStorage.setItem('productsCount', JSON.stringify(productsCount));
            productsInBasketCount.forEach(count => {
              count.innerText = productsCount;
            });
          }
          else {
            storageArray[i].count -= 1;
            localStorage.setItem('productsInBasket', JSON.stringify(storageArray));
            productsInBasket = storageArray;
            orderInformationRender();

            productsCount--;
            localStorage.setItem('productsCount', JSON.stringify(productsCount));
            productsInBasketCount.forEach(count => {
              count.innerText = productsCount;
            });
          }
        }
      }
    }
  }

  /* plusFunc функция увеличения продуктов в корзине */
  function plusFunc(event) {
    if (localStorage.length > 0) {
      let storageArray = JSON.parse(localStorage.getItem('productsInBasket'));

      for (let i = 0; i < storageArray.length; i++) {
        if (storageArray[i].id === event) {
          storageArray[i].count++;
          localStorage.setItem('productsInBasket', JSON.stringify(storageArray));
          productsInBasket = storageArray;
          orderInformationRender();

          productsCount++;
          localStorage.setItem('productsCount', JSON.stringify(productsCount));
          productsInBasketCount.forEach(count => {
            count.innerText = productsCount;
          });
        }

      }
    }
  }

  /* deleteFunc функция удаления продуктов в корзине */
  function deleteFunc(event) {
    if (localStorage.length > 0) {
      let storageArray = JSON.parse(localStorage.getItem('productsInBasket'));

      for (let i = 0; i < storageArray.length; i++) {
        if (storageArray.length - 1 === 0) {
          if (storageArray[i].id === event) {
            localStorage.clear();
            checkProductsInBasket();
            orderInformationRender();
          }
        }
        else if (storageArray[i].id === event) {
          productsCount -= storageArray[i].count;
          localStorage.setItem('productsCount', JSON.stringify(productsCount));
          productsInBasketCount.forEach(count => {
            count.innerText = productsCount;
          });

          storageArray.splice(i,1);
          localStorage.setItem('productsInBasket', JSON.stringify(storageArray));
          productsInBasket = storageArray;
          orderInformationRender();
        }
      }
    }
  }

  inBasketBtn.forEach(btn => {    
    btn.addEventListener('click', (event) => {
      productsCount++;
      localStorage.setItem('productsCount', JSON.stringify(productsCount));
      productsInBasketCount.forEach(count => {
        count.innerText = productsCount;
      });

      let productId = event.currentTarget.id;
      let productName = event.currentTarget.parentNode.parentNode.firstChild.nextElementSibling.innerText;
      let productPrice = event.currentTarget.parentNode.firstChild.nextElementSibling.innerText;

      if (productsInBasket.length !== 0) {
        let containProduct = false;

        productsInBasket.forEach(product => {
          if (product.id === productId) {
            product.count++;
            localStorage.setItem('productsInBasket', JSON.stringify(productsInBasket));
            containProduct = true;
          }  
        })

        if (containProduct === false) {
          productCard = {
            id: productId,
            productName: productName,
            productPrice: productPrice,
            count: 1
          };
          productsInBasket.push(productCard);
          localStorage.setItem('productsInBasket', JSON.stringify(productsInBasket));
        }

      }
      else {
        productCard = {
          id: productId,
          productName: productName,
          productPrice: productPrice,
          count: 1
        };
        productsInBasket.push(productCard);
        localStorage.setItem('productsInBasket', JSON.stringify(productsInBasket));
      }

      orderInformationRender();
    })
  })

  btnCleanBasket.addEventListener('click', ()=> {
    if (localStorage.length > 0) {
      const warning = confirm('Очистить корзину?');
      if (warning) {
        localStorage.clear();
        checkProductsInBasket();
        orderInformationRender();
      }
    }
    else alert('Ваша корзина пуста!')
  });

  /* ----------------------------------------------- */

  /* INPUTMASK */
  const form = document.querySelector('.form');
  const telSelector = document.querySelector('input[type="tel"]');
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telSelector);

  /* ----------------------------------------------- */

  /* JUST-VALIDATE */
  new JustValidate('.form', {

    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Введите 2 и более символов',
        maxLength: 'Запрещено вводить более 30 символов'
      },

      phone: {
        required: 'Укажите ваш телефон',
        function: 'Введите корректный номер телефона'
      },

      address: {
        required: 'Не указан адрес',
        minLength: 'Введите 2 и более символов'
      }
    },

    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
      },

      phone: {
        required: true,
        function: (name, value) => {
          const phone = telSelector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      address: {
        required: true,
        minLength: 2,
      }
    },

    submitHandler: function(thisForm){
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  });

})
