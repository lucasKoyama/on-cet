const blueprint = document.querySelector('.blueprint');
const house = document.querySelector('.house');
const navbar = document.querySelector('nav');
const houseImg = document.querySelector('.project-photo');
const bigNum = document.querySelectorAll('.num');
const mainY = window.innerHeight;
const main = document.querySelector('main');
let lastScrollPos = 0;
let runBigNums = true;
let mobileMenuOff = true;
// Efeitos ao scrolar a página
main.addEventListener('scroll', () => {
  const scrollPosition = main.scrollTop;
  const houseImgDelta = houseImg.getBoundingClientRect().top;
  // blueprint > house effect
  if (houseImgDelta <= mainY * 0.31) {
    blueprint.className = 'fade-out';
    house.className = 'fade-in'
  } else {
    blueprint.className = 'fade-in';
    house.className = 'fade-out'
  }
  // Big Numbers effect
  const numsDelta = bigNum[0].getBoundingClientRect().top;
  if (runBigNums && numsDelta < mainY * 0.93) {
    runBigNums = false;
    const interval = 1000;
    bigNum.forEach((num) => {
      let startNum = 0;
      const endNum = parseInt(num.getAttribute('data-val'));
      const duration = Math.floor(interval / endNum);
      const counter = setInterval(() => {
        startNum += 1
        num.textContent = startNum;
        if (startNum == endNum) clearInterval(counter);
      }, duration);
    });
  }
  // navbar effects
  navbar.style.background = scrollPosition >= 660 ? 'linear-gradient(0deg, rgba(31,31,31,0.95) 0%, rgba(18,18,18,0.95) 100%)' : '';
  scrollPosition > lastScrollPos && mobileMenuOff ? navbar.classList.add('shrink') : navbar.classList.remove('shrink');
  lastScrollPos = scrollPosition;
});

// BIM Info
const bim = document.querySelector('.bim');
const bimInfo = document.querySelector('.bim-info');
const aboutCetSec = document.querySelector('.about-on-cet');
const partnersSec = document.querySelector('.partners');
const returnBtn = document.querySelector('.bim-info button');
const focusInfo = (blurSec, focusInfo, winOpacity, blur) => {
  focusInfo.style.zIndex = winOpacity === '2' ? '2' : '-1';
  focusInfo.style.opacity = winOpacity;
  blurSec.style.filter = blur;
};
bim.addEventListener('click', () => focusInfo(aboutCetSec, bimInfo, '2', 'blur(4px)'));
bim.addEventListener('click', () => focusInfo(partnersSec, bimInfo, '2', 'blur(4px)'));
returnBtn.addEventListener('click', () => focusInfo(aboutCetSec, bimInfo, '0', ''));
returnBtn.addEventListener('click', () => focusInfo(partnersSec, bimInfo, '0', ''));

// Partner Info
const partners = document.querySelectorAll('.partner');
partners.forEach((partner) => partner.addEventListener('click', (event) => {
  const info = partner.querySelector('.partner-info');
  if (!event.target.classList.contains('return-btn') && info.style.display !== 'block') {
    partners.forEach((person) => person.style.opacity = '0');
    setTimeout(() => {
      partner.childNodes[1].childNodes[3].classList.add('more-info-img');
      partner.querySelectorAll('h4').forEach((h4) => h4.classList.add('more-info-h4'));
      partner.childNodes[1].childNodes[5].classList.add('more-info-p');
      info.style.display = 'block'
      partners.forEach((person) => person.style.display = 'none');
      partner.style.display = 'flex';
      partner.style.opacity = '1';
    }, 1400);
    setTimeout(() => {
      info.style.opacity = '1';
      info.classList.add('partner-info-show');
    }, 1600);
    const btn = partner.querySelector('.return-btn');
    btn.addEventListener('click', () => {
      partners.forEach((person) => {
        partner.style.opacity = '0';
        setTimeout(() => {
          partner.childNodes[1].childNodes[3].classList.remove('more-info-img');
          partner.querySelectorAll('h4').forEach((h4) => h4.classList.remove('more-info-h4'));
          partner.childNodes[1].childNodes[5].classList.remove('more-info-p');
          info.style.display = 'none';
          info.style.opacity = '0';
          info.classList.remove('partner-info-show');
          person.style.display = 'flex';
        }, 1500)
        setTimeout(() => person.style.opacity = '1', 1600);
      });
    });
  }
  }
));

// Vitae do Cesar
const aboutMeBtn = document.querySelector('.about-me-more button');
const generalInfo = document.querySelector('.info');
const previousInfo = generalInfo.cloneNode(true);
let notClicked = true;
aboutMeBtn.addEventListener('click', () => {
  if (notClicked) {
    generalInfo.childNodes.forEach((ul, index) => {
      if (index % 2 !== 0) ul.style.filter = 'blur(500px)';
    });
    generalInfo.style.background = 'rgb(28, 37, 64)';
    setTimeout(() => {
      generalInfo.innerHTML = '<p>César Tavares fundador da “Cet Engenharia”, criou um escritório de projetos estrutrais, sempre com o objetivo de criar a boa engenharia na construções civil. Buscando parcerias solidas e comprometidas. Atendendo São João da Boa Vista e Região. Hoje a Cet Engenharia evoluiu para “on cet”, com o objetivo de estender as fronteiras que o atendimento presencial limitava, para o atendimento on-line, rompendo as essas barreiras físicas e atender para todo território nacional, estamos 100 % com atendimento ON LINE.</p>';
      generalInfo.classList.add('vitae');
    }, 1500);
    notClicked = false;
  } else {
    generalInfo.classList.remove('vitae');
    generalInfo.style.background = 'rgb(243,154,52)';
    generalInfo.innerHTML = previousInfo.innerHTML;
    setTimeout(() => {
      generalInfo.childNodes.forEach((ul, index) => {
        if (index % 2 !== 0) ul.classList.add('show');
      });
    }, 200)
    notClicked = true;
  }
});

// Carousel - https://www.youtube.com/watch?v=QAD0K112tlQ&t=60s - BUG no último item a tela se desloca, provavelmente por conta do main ser o scroll principal
const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    if (currentItem + 1 < maxItems) {
      items[currentItem].scrollIntoView({
        behavior: "smooth",
        inline: "center"
      });
    } else {
      items[currentItem].scrollIntoView({
        behavior: "smooth",
      });
    }

    items[currentItem].classList.add("current-item");
  });
});

// Navbar no celular
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    main.classList.toggle('main-menu-on');
    this.animateLinks();
    mobileMenuOff = mobileMenuOff === true ? false : true;
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
