// Бургер-меню ------------------------------

const burgerButton = document.getElementById('menu-toggle')
const cover = document.querySelector('.cover')
const inactiveLink = document.querySelectorAll('.nav-item a')
const activeLink = document.querySelector('.nav-item p')
const body = document.querySelector('body')
let unlock = true;

const toggleMenu = () => {
    document.querySelector('.header-content').classList.toggle('open')
    cover.classList.toggle('hidden')

    if (body.classList.contains('overflow-hidden')) {
        bodyUnlock();
    }
    else {
        bodyLock();
    }
}

const bodyLock = () => {
    const scrollWidth = window.innerWidth - document.querySelector('.body_wrapper').offsetWidth + 'px';
    body.style.paddingRight = scrollWidth;
    body.classList.add('overflow-hidden')
    unlock = false;
    setTimeout (function() {
        unlock=true;
    }, 500)
}

const bodyUnlock = () => {
    body.style.paddingRight = '0px';
  body.classList.remove('overflow-hidden')  
  unlock = false;
  setTimeout (function() {
      unlock=true;
  }, 500)
}


burgerButton.addEventListener('click', toggleMenu)
document.getElementById('burger').addEventListener('click', toggleMenu)

cover.addEventListener('click', toggleMenu)


inactiveLink.forEach(el => el.addEventListener('click', toggleMenu))

activeLink.addEventListener('click', toggleMenu)

window.addEventListener('resize', () => {
    document.querySelector('.header-content').classList.remove('open')
    document.querySelector('.cover').classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
})

// --------------------------------

// Слайдер ------------------------

const pets = [
    {
      "name": "Jennifer",
      "id": "001",
      "img": "source/images/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "id": "002",
      "img": "source/images/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "id": "003",
      "img": "source/images/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "id": "004",
      "img": "source/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "id": "005",
      "img": "source/images/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "id": "006",
      "img": "source/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "id": "007",
      "img": "source/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "id": "008",
      "img": "source/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["leptospirosis"],
      "diseases": ["deafness"],
      "parasites": ["lice", "fleas"]
    }
  ]

const buttonLeft = document.querySelector('#slide-left');
const buttonRight = document.querySelector('#slide-right');
const carousel = document.querySelector(".pets-cards");
const leftCards = document.querySelector('.left-cards');
const activeCards = document.querySelector('.active');
const rightCards = document.querySelector('.right-cards');


let previousCards = [];
let currentCards = [];
let nextCards = [];

const getNextCards = () => {
    nextCards.length = 0;
    while (nextCards.length < 3) {
        let randomIndex = Math.floor(Math.random() * pets.length);
        let randomPet = pets[randomIndex];

    const existInCurrentCards = !!currentCards.filter((element) => element.id === randomPet.id).length;
    const existInNextCards = !!nextCards.filter((element) => element.id === randomPet.id).length;

    if (!existInCurrentCards && !existInNextCards) {
        nextCards.push(randomPet);
    }
}
}

const getPreviousCards = () => {
    previousCards.length = 0;
    while (previousCards.length < 3) {
        let randomIndex = Math.floor(Math.random() * pets.length);
        let randomPet = pets[randomIndex];

    const existInCurrentCards = !!currentCards.filter((element) => element.id === randomPet.id).length;
    const existInPreviousCards = !!previousCards.filter((element) => element.id === randomPet.id).length;

    if (!existInCurrentCards && !existInPreviousCards) {
        previousCards.push(randomPet);
    }
}
}

const assignCards = () => {
    getNextCards();
    currentCards = [...nextCards];
    getNextCards();
    previousCards = [...currentCards];
    currentCards = [...nextCards];
    getNextCards();
}

let cardsCount;
const mobileMedia = window.matchMedia('(max-width: 767px)');
const tabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const desktopMedia = window.matchMedia('(min-width: 1280px)');


if (desktopMedia.matches) {
        cardsCount = 3;
    }
    else if (tabletMedia.matches) {
        cardsCount = 2;
    }
    else if (mobileMedia.matches) {
        cardsCount = 1;
    }


desktopMedia.addEventListener('change', (width) => {
    if (width.matches) {
        cardsCount = 3;
        generateCards();
    }
})

tabletMedia.addEventListener('change', (width) => {
    if (width.matches) {
        cardsCount = 2;
        generateCards();
    }
})

mobileMedia.addEventListener('change', (width) => {
    if (width.matches) {
        cardsCount = 1;
        generateCards();
    }
})

const createCards = (array, item) => {
    item.innerHTML = '';

    for (let i = 0; i < cardsCount; i++) {
        const card = document.createElement('div');
        card.classList.add('pet-card');
        card.id = array[i].id;
        const img = document.createElement("img");
        img.src = array[i].img;
        img.alt = array[i].name;
        card.appendChild(img);
        const petTitle = document.createElement("p");
        petTitle.classList.add("pets-heading")
        petTitle.textContent = array[i].name;
        card.appendChild(petTitle);
        const detailsButton = document.createElement("button");
        detailsButton.classList.add("pets-link")
        detailsButton.textContent = 'Learn more'
        card.appendChild(detailsButton);
        item.appendChild(card);
    }
}

const generateCards = () => {
    createCards(previousCards, leftCards);
    createCards(currentCards, activeCards);
    createCards(nextCards, rightCards);
}

const updateNext = () => {
    previousCards = [...currentCards];
    currentCards = [...nextCards];
    getNextCards();
}

const firstBackThenNext = () => {
    const saveCards = [...currentCards];
    currentCards = [...nextCards];
    previousCards = [...saveCards];
    getNextCards();
}

const updatePrevious = () => {
    nextCards = [...currentCards];
    currentCards = [...previousCards];
    getPreviousCards();
}

const firstNextThenBack = () => {
  const saveCards = [...currentCards];
  currentCards = [...previousCards];
  nextCards = [...saveCards];
  getPreviousCards();
}

let isToLeft = false;
let isToRight = false;


const toLeft = () => {
    if (isToRight) {
        firstNextThenBack();
        isToRight = false;
      } else {
        updatePrevious();
      }
      isToLeft = true;
    
      carousel.classList.add('move-left');
      buttonLeft.removeEventListener('click', toLeft);
      buttonRight.removeEventListener('click', toRight);
    };
    

const toRight = () => {
    if (isToLeft) {
        firstBackThenNext();
        isToLeft = false;
      } else {
        updateNext();
      }
      isToRight = true;
    
      carousel.classList.add('move-right');
      buttonLeft.removeEventListener('click', toLeft);
      buttonRight.removeEventListener('click', toRight);
    };

buttonLeft.addEventListener('click', toLeft);
buttonRight.addEventListener('click', toRight);

carousel.addEventListener('animationend', (event) => {
    if (event.animationName === 'move-left') {
        carousel.classList.remove('move-left');
    }
    else {
        carousel.classList.remove('move-right');
    } 
    generateCards();
    buttonLeft.addEventListener('click', toLeft);
    buttonRight.addEventListener('click', toRight);
});

assignCards();
generateCards();

// --------------------------------

// Модальные окна ----------------------

const petCardsContainer = document.querySelector('#popup')
const popupWrapper = document.querySelector('.popup-wrapper')
const popup = document.querySelector('.popup')
const petCards = document.querySelectorAll('.pet-card')
const closeButton = document.querySelector('.popup-close')
const popupContent = document.querySelector('.popup-content')


const openPopup = (event) => {
    const card = event.target.closest('.pet-card');
    const pet = pets.find(({ id }) => id === card.id);
    generatePopup(pet);
    popupWrapper.classList.remove('hidden')
    event.preventDefault();
    bodyLock(); 
}

const closePopup = () => {
    popupWrapper.classList.toggle('hidden')
    bodyUnlock();
    popupContent.innerHTML = '';
}


closeButton.addEventListener('click', closePopup);


popupWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup-wrapper')) {
        closePopup();
}
});

const generatePopup = (pet) => {
    const img = document.createElement('img')
    img.classList.add('popup-img')
    const imgName = pet.name
    img.src = pet.img;
    img.alt = pet.name;
    popupContent.appendChild(img);
    const textContent = document.createElement('span')
    textContent.classList.add('popup-text')
    textContent.innerHTML = `<h3 class="popup-title">${pet.name}</h3>
    <h4 class="popup-subtitle">${pet.type} - ${pet.breed}</h4>
    <h5 class="popup-description">${pet.description}</h5>
    <ul class="popup-list">
      <li>
        <h5 class="popup-list-item"><b>Age:</b> ${pet.age}</h5>
      </li>
      <li>
        <h5 class="popup-list-item"><b>Inoculations:</b> ${pet.inoculations.join(', ')}</h5>
      </li>
      <li>
        <h5 class="popup-list-item"><b>Diseases:</b> ${pet.diseases.join(', ')}</h5>
      </li>
      <li>
        <h5 class="popup-list-item"><b>Parasites:</b> ${pet.parasites.join(', ')}</h5>
      </li>
    </ul>`
    popupContent.appendChild(textContent);
}

if (petCardsContainer) {
    petCardsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.pet-card')) {
            openPopup(event);
        }
    })
}