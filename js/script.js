/*
ローディングから画面移行
=================================================== */
if (window.innerWidth >= 1050) {
  // ローディング中テキスト
  const loadingAreaMain = document.querySelector('#loading');
  const keyframesAreaMain = {
      visibility: 'hidden',
  };
  const optionsAreaMain = {
    delay: 1200,
    duration: 2000,
    easing: 'ease',
    fill: 'forwards',
  };
  
  const loadingText = document.querySelector('#home');
  const keyframesText = [
    {
      opacity: 1,
      offset: .8  //80%
    },
    {
      opacity: 0,
      offset: 1  //100%
    },
  ];
  const optionsText = {
    duration: 1200,
    easing: 'ease',
    fill: 'forwards',
  };

  // ローディング中（左右）
  const loadingAreaLeft = document.querySelector('#loading-left');
  const loadingAreaRight = document.querySelector('#loading-right');
  const keyframesArea = {
    transform: ['scaleX(1)', 'scaleX(0)'],
  };
  const optionsArea = {
    delay: 1200,
    duration: 2000,
    easing: 'ease',
    fill: 'forwards',
  };

  window.addEventListener('load', () => {
    loadingAreaMain.animate(keyframesAreaMain, optionsAreaMain);
    loadingText.animate(keyframesText, optionsText);
    loadingAreaLeft.animate(keyframesArea, optionsArea);
    loadingAreaRight.animate(keyframesArea, optionsArea);
  });
}


/*
スライドメニューパネル
=================================================== */
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('#menu-panel li');
const menuOptions = {
  duration: 1400,
  easing: 'ease',
  fill: 'forwards',
};

menuOpen.addEventListener('click', () => {
  menuPanel.animate({ translate: ['100vw', 0] }, menuOptions);
  menuItems.forEach((menuItem, index) => {
    menuItem.animate(
      {
        opacity: [0, 1],
        translate: ['2rem', 0],
      },
      {
        duration: 2400,
        delay: 300 * index,
        easing: 'ease',
        fill: 'forwards',
      }
    );
  });
});

menuClose.addEventListener('click', () => {
  menuPanel.animate({ translate: [0, '100vw'] }, menuOptions);
  menuItems.forEach((menuItem) => {
    menuItem.animate({ opacity: [1, 0] }, menuOptions);
  });
});

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    menuPanel.animate({ translate: [0, '100vw'] }, menuOptions);
    menuItems.forEach((menuItem) => {
      menuItem.animate({ opacity: [1, 0] }, menuOptions);
    });
  });
});


/*
地図を光らせる
=================================================== */
const listItems = document.querySelectorAll('.star__list button');
const mapGroup = document.querySelectorAll('.map__container__item__map g');

listItems.forEach((item) => {

  item.addEventListener('click', () => {

    // いったん全部の光を消す
    mapGroup.forEach((group) => {
      group.classList.remove('active');
    });

    // クリックされたリストのdata-targetを取得
    const targetIds = item.dataset.target.split(',');

    // 対応するSVGを探し光らせる
    targetIds.forEach((id) => {
      document.getElementById(id).classList.add('active');
    });

    // マップに移動
    let offset;

    if (window.innerWidth <= 1023) {
      offset = - 10;
    } else {
      offset = - 180;
    }

    const target = document.querySelector('#map');
    const position =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: position,
      // behavior: 'smooth'
    });

  });
});
