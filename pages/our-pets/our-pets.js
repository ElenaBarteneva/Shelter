// Бургер-меню ------------------------------

const burgerButton = document.getElementById('menu-toggle')
const cover = document.querySelector('.cover')
const inactiveLink = document.querySelectorAll('.nav-item a')
const activeLink = document.querySelector('.nav-item p')
const body = document.querySelector('body')
let unlock = true;

const toggleMenu = () => {
    document.querySelector('.header.content').classList.toggle('open')
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
    document.querySelector('.header.content').classList.remove('open')
    document.querySelector('.cover').classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
})

// --------------------------------

// Пагинация ----------------------

const pets = [
    {
      "name": "Jennifer",
      "id": "001",
      "img": "../../source/images/pets-jennifer.png",
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
      "img": "../../source/images/pets-sophia.png",
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
      "img": "../../source/images/pets-woody.png",
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
      "img": "../../source/images/pets-scarlet.png",
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
      "img": "../../source/images/pets-katrine.png",
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
      "img": "../../source/images/pets-timmy.png",
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
      "img": "../../source/images/pets-freddie.png",
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
      "img": "../../source/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["leptospirosis"],
      "diseases": ["deafness"],
      "parasites": ["lice", "fleas"]
    }
  ]

  
const cardsContainer = document.querySelector('.cards-container');
const firstPageButton = document.querySelector('#first-page');
const previousPageButton = document.querySelector('#previous-page');
const activePageButton = document.querySelector('#active-page');
const nextPageButton = document.querySelector('#next-page');
const lastPageButton = document.querySelector('#last-page');



const getShuffledArray = () => {
    let resultArray = [];
    
    for (let i = 0; i < 6; i++) {
        resultArray.push(...shuffleArray(pets.slice(0, 4)), ...shuffleArray(pets.slice(4, 8)));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
   
    console.log(resultArray);
    return resultArray;

}


let countOfCards;
let countOfPages;
let pageNumber = 1;
let shuffledPets = getShuffledArray();

const mobileMedia = window.matchMedia('(max-width: 767px)');
const tabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const desktopMedia = window.matchMedia('(min-width: 1280px)');

if (desktopMedia.matches) {
    countOfCards = 8;
    countOfPages = 6;
}
else if (tabletMedia.matches) {
    countOfCards = 6;
    countOfPages = 8;
}
else if (mobileMedia.matches) {
    countOfCards = 3;
    countOfPages = 16;
}

desktopMedia.addEventListener('change', (width) => {
    if (width.matches) {
        countOfCards = 8;
        countOfPages = 6;
        pageNumber = 1;
    }
    generateCards();
    configureButtons();
})

tabletMedia.addEventListener('change', (width) => {
    if (width.matches) {
        countOfCards = 6;
        countOfPages = 8;
        pageNumber = 1;
    }
    generateCards();
    configureButtons();
})

mobileMedia.addEventListener('change', (width) => {
    if (width.matches) {
        countOfCards = 3;
        countOfPages = 16;
        pageNumber = 1;
    }
    generateCards();
    configureButtons();
})





const configureButtons = () => {
    if (pageNumber === 1) {
        previousPageButton.disabled = true;
        firstPageButton.disabled = true;
    }
    else {
        previousPageButton.disabled = false;
        firstPageButton.disabled = false;
    }

    if (pageNumber === countOfPages) {
        nextPageButton.disabled = true;
        lastPageButton.disabled = true;
    }

    else {
        nextPageButton.disabled = false;
        lastPageButton.disabled = false;
    }
}


const generateCards = (function() {
    activePageButton.innerHTML = String(pageNumber);

    let start = (pageNumber - 1) * countOfCards;
    let end = start + countOfCards;

    let cardsShowed = shuffledPets.slice(start, end);

    cardsContainer.innerHTML = '';
    for (let pet of cardsShowed) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = pet.id;
        const img = document.createElement("img");
        img.src = pet.img;
        img.alt = pet.name;
        card.appendChild(img);
        const petTitle = document.createElement("p");
        petTitle.classList.add("pet-card-heading")
        petTitle.textContent = pet.name;
        card.appendChild(petTitle);
        const detailsButton = document.createElement("button");
        detailsButton.textContent = 'Learn more'
        detailsButton.classList.add('pets-link');
        card.appendChild(detailsButton);
        cardsContainer.appendChild(card);
    }
})

const nextPage = () => {
    pageNumber +=1;
    generateCards();
    configureButtons();
}

const previousPage = () => {
    pageNumber -=1;
    generateCards();
    configureButtons();
}

const firstPage = () => {
    pageNumber = 1;
    generateCards();
    configureButtons();
}

const lastPage = () => {
    pageNumber = countOfPages;
    generateCards();
    configureButtons();
}

generateCards();
configureButtons();

nextPageButton.addEventListener('click', nextPage);
previousPageButton.addEventListener('click', previousPage);
firstPageButton.addEventListener('click', firstPage);
lastPageButton.addEventListener('click', lastPage);

// ------------------------------------------------------------------
// Модальные окна ---------------------------------------------------

const petCardsContainer = document.querySelector('#popup')
const popupWrapper = document.querySelector('.popup-wrapper')
const popup = document.querySelector('.popup')
const petCards = document.querySelectorAll('.card')
const closeButton = document.querySelector('.popup-close')
const popupContent = document.querySelector('.popup-content')


const openPopup = (event) => {
    const card = event.target.closest('.card');
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
        if (event.target.closest('.card')) {
            openPopup(event);
        }
    })
}