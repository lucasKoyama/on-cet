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
const bimInfoState = (winOpacity, blur) => {
  bimInfo.style.opacity = winOpacity;
  aboutCetSec.style.filter = blur;
  partnersSec.style.filter = blur;
};
bim.addEventListener('click', () => bimInfoState('1', 'blur(4px)'));
bim.addEventListener('touchstart', () => bimInfoState('1', 'blur(4px)'));
returnBtn.addEventListener('click', () => bimInfoState('0', ''));
returnBtn.addEventListener('touchstart', () => bimInfoState('0', ''));


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

// Partner
const partners = document.querySelectorAll('.partner');
const partnerInfo = () => {
  partners.forEach((partner) => partner.style.opacity = '0');
  partners[2].style.opacity = '1';
  partners[2].style.transform = 'translate(-230px, -10px)';
  setTimeout(() => {
    partners[2].childNodes[1].childNodes[1].style.transform = 'translate(200px, 55px)';
    partners[2].childNodes[1].childNodes[5].style.transform = 'translate(200px, -235px)';
  }, 2500);
};
partners[2].addEventListener('click', partnerInfo);
console.log(partners[2].childNodes);

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
