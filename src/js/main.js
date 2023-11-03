// Header nav
const nav = document.querySelector('.header__nav');
const navButton = document.querySelector('.header__nav-button');
const navSpan = navButton.querySelector('span');
const background = document.createElement('div');

for (let listItem of nav.querySelectorAll('li')) {
    listItem.onmouseup = (e) => e.target.blur();
}

navButton.addEventListener('click', function(e) {
    if (!e.target.closest('button')) return;
    
    if (!nav.querySelector('.background')) {
        document.body.append(background);
        background.classList.add('background');
    };

    nav.classList.toggle('open');
    navSpan.classList.toggle('open');
    background.classList.toggle('open');
    if (nav.classList.contains('open')) {
        navButton.setAttribute('aria-expanded', 'true');
    } else {
        navButton.removeAttribute('aria-expanded');
    }
});

//images - medium + small screens
const galleryImages = document.querySelector('.main__add-gallery');
const prevGalleryButton = galleryImages.querySelector('.arrow-prev');
const nextGalleryButton = galleryImages.querySelector('.arrow-next');
const listOfImages = galleryImages.querySelector('.main__slide-container');
let currentSlide = 0, slideDistance, maxSlideDistance, countSlideImages;

for (let button of galleryImages.querySelectorAll('.main__slide-arrow')) {
    button.onmouseup = (e) => e.target.blur(); 
}

//slide gallery implementation
nextGalleryButton.addEventListener('click', gallerySlideNext);
prevGalleryButton.addEventListener('click', gallerySlidePrev);

function gallerySlideNext() {
    countSlideImages = document.documentElement.clientWidth > 650 ? 2 : 3;
    slideDistance = galleryImages.querySelector('img').offsetWidth;
    maxSlideDistance = slideDistance * countSlideImages;

    if (currentSlide + slideDistance <= maxSlideDistance) {
        listOfImages.style.transform = `translate(-${currentSlide + slideDistance}px)`;
        currentSlide += slideDistance; 
    } else {
        return;
    }
}

function gallerySlidePrev() {
    countSlideImages = document.documentElement.clientWidth > 650 ? 2 : 3;
    slideDistance = galleryImages.querySelector('img').offsetWidth;
    maxSlideDistance = slideDistance * countSlideImages;

    if (currentSlide - slideDistance >= 0) {
        listOfImages.style.transform = `translate(-${(currentSlide - slideDistance)}px)`;
        currentSlide -= slideDistance;
    } else {
        return;
    }
}

// Images - large screens
const entireImgSection = document.querySelector('.main__section--images');
const thumbSection = document.querySelector('.main__thumbnails');

// all images can be focused
const allImages = entireImgSection.querySelectorAll('img');
for (let img of allImages) {
    if (document.documentElement.clientWidth >= 1150) {
        img.tabIndex = 0;
    }
}
//init focus
allImages[1].focus();

const bigPicture = document.querySelector('[data-current-big]');

thumbSection.addEventListener('click', onThumbClick);
thumbSection.addEventListener('focusin', onThumbFocus);
bigPicture.addEventListener('click', lightboxHandler);


function onThumbClick(e) {
    let target = e.target.closest('img');
    if (!target) return;

    const currentPicture = target.closest('picture');
    const currentSection = target.closest('section');

    changeImages(currentSection, currentPicture);
}

function onThumbFocus(e) {
    let target = e.target.closest('img');
    if (!target) return;

    target.addEventListener('keydown', function (e) {
        if (e.code == 'Enter' || e.code == 'Space') {
            changeImages(target.closest('picture'));
        } else {
            return;
        }
    })
}

//Lightbox 

function lightboxHandler(e) {
    if (document.documentElement.clientWidth < 1150) return;

    let target = e.target.closest('img');
    if (!target) return;

    const lightboxSection = entireImgSection.cloneNode(true);
    const lightboxBackground = document.createElement('div');
    const closeButton = document.createElement('span');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');
    const bigImage = lightboxSection.querySelector('[data-current-big]');
    const allThumbs = Array.from(lightboxSection.querySelectorAll('.main__image--thumb'));
    const allImagesSrcs = allThumbs.map(imgNode => {
        return imgNode.getAttribute('src').replace(/-thumbnail/, '');
    });
    const allSourcesWebp = allImagesSrcs.map(src => {
        return src.replace(/jpg$/, 'webp');
    });
    let currentImageInd = 0;

    if (!document.querySelector('.lightbox-section')) {
        lightboxSection.classList.add('lightbox-section', 'container-main');
        document.querySelector('.main').append(lightboxSection);

        lightboxBackground.classList.add('lightbox-background');
        document.querySelector('.main').append(lightboxBackground);

        //buttons
        closeButton.className = 'lightbox-section__close';
        nextButton.className = 'lightbox-section__next';
        nextButton.innerHTML = '&#10095;';
        prevButton.className = 'lightbox-section__prev';
        prevButton.innerHTML = '&#10094;'

        const buttons = [closeButton, nextButton, prevButton];
        for (let button of buttons) {
            lightboxSection.append(button);
            button.tabIndex = 0;
            button.onmouseup = (e) => e.target.blur();
        }
    }

    lightboxBackground.classList.add('open');
    lightboxSection.classList.add('open');

    //events
    lightboxSection.addEventListener('click', clickThumb);
    lightboxSection.addEventListener('focusin', focusThumb);
    closeButton.addEventListener('click', closeLightbox);
    nextButton.addEventListener('click', slideNextImage);
    prevButton.addEventListener('click', slidePrevImage); 

    //initial focus
    allThumbs[0].focus();

    //click/focus listeners
    function clickThumb(e) {
        let target = e.target.closest('img');
        if (!target || !lightboxSection.contains(target)) return;

        let targetSrc = target.getAttribute('src').replace(/-thumbnail/, '');
        currentImageInd = allImagesSrcs.indexOf(targetSrc);

        changeImagesLightbox();
    }

    function focusThumb(e) {
        let target = e.target.closest('img');
        if (!target || !lightboxSection.contains(target)) return;

        target.onkeydown = function (e) {
            if (e.code == 'Enter' || e.code == 'Space') {
                e.preventDefault(); // prevent scroll on 'space'
                let targetSrc = target.getAttribute('src').replace(/-thumbnail/, '');
                currentImageInd = allImagesSrcs.indexOf(targetSrc);

                changeImagesLightbox();
            } else {
                return;
            }
        }
    }


    //event-listeners for buttons;
    function closeLightbox() {
        lightboxSection.remove();
        lightboxBackground.remove();
    }

    function slideNextImage() {
        if (currentImageInd === allImagesSrcs.length - 1) return;

        currentImageInd++;
        allThumbs[currentImageInd].focus();
        changeImagesLightbox();
    }

    function slidePrevImage() {
        if (currentImageInd === 0) return;

        currentImageInd--;
        allThumbs[currentImageInd].focus();
        changeImagesLightbox();
    }


    //helper functions
    function changeImagesLightbox() {
        bigImage.querySelector('img').setAttribute('src', allImagesSrcs[currentImageInd]);
        bigImage.querySelector('source').setAttribute('srcset', allSourcesWebp[currentImageInd]);
    }
}



//helper functions 
function changeImages(section, picture) {
    const targetSrc = picture.querySelector('img').getAttribute('src').replace(/-thumbnail/, '');
    const targetSrcset = picture.querySelector('source').getAttribute('srcset').replace(/-thumbnail/, '');

    const currentBigImage = section.querySelector('[data-current-big]');

    currentBigImage.querySelector('img').setAttribute('src', targetSrc);
    currentBigImage.querySelector('source').setAttribute('srcset', targetSrcset);
}


// Product info

const counter = document.querySelector('.main__counter');
const minusButton = counter.firstElementChild;
const plusButton = counter.lastElementChild;
const quantity = counter.querySelector('input[type="number"]');
let quantityValue = Number(quantity.value);

const cta = document.querySelector('.main__cta');
const cart = document.querySelector('.header__cart');
const cartInfo = document.querySelector('.cart-info');
const cartEmpty = cartInfo.querySelector('.cart-info__init');
const cartMain = cartInfo.querySelector('.cart-info__wrapper');
const deleteButton = cartInfo.querySelector('.cart-info__button');
let notification = null;
let insertSpan;


counter.addEventListener('click', changeQuantityClick);
counter.addEventListener('focusin', changeQuantityFocus);
cta.addEventListener('click', ctaClick);
cart.addEventListener('click', cartClick);
deleteButton.addEventListener('click', deleteProducts);
quantity.addEventListener('change', quantityChange);

//get rid of keeping focus after click  
for (let button of [document.querySelector('.cart-info__checkout'), cta]) {
    button.onmouseup = (e) => e.target.blur();
}

function changeQuantityClick(e) {
    let target = e.target.closest('button');
    if (!target || !counter.contains(target)) return;

    if (target == plusButton) {
        quantityValue = quantityValue + 1;
        quantity.value = quantityValue;
    }
    else {
        if (quantityValue > 0) {
            quantityValue--;
            quantity.value = quantityValue;
        }
        else return; 
    }
}


function changeQuantityFocus(e) {
    let target = e.target.closest('button');
    if (!target || !counter.contains(target)) return;

    target.addEventListener('keydown', changeQuantityKey);

    function changeQuantityKey(e) {
        if (e.key == 'Space') {
            if (target == plusButton) {
                quantityValue++;
                quantity.value = quantityValue;
            }
            else {
                if (quantityValue > 0) {
                    quantityValue--;
                    quantity.value = quantityValue;
                }
                else return; 
            }
        } else return;
    }
}

function quantityChange() {
    quantityValue = Number(quantity.value);
    quantity.value = quantityValue;
}


function ctaClick(e) {
    if (!e.target.closest('button')) return;

    const priceText = cartInfo.querySelector('.cart-info__container').lastElementChild;
    const price = 125;

    if (quantityValue == 0) {
        quantityValue++;
        quantity.value = quantityValue;
    }

    if (!cart.querySelector('.notification')) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = quantityValue;
        cart.append(notification);
    }
    else notification.innerHTML = `${quantityValue}`;

    cartEmpty.hidden = true;
    cartEmpty.style.display = 'none';
    cartMain.hidden = false;
    cartMain.style.display = 'flex';

    if (insertSpan) {
        insertSpan.remove();
        insertSpan = null;
    } 

    insertSpan = document.createElement('span');
    insertSpan.className = 'cart-info__price-sum';
    priceText.append(insertSpan);

    insertSpan.innerHTML = ` ${quantityValue} = &dollar;${price * quantityValue}`;


    //animation
    const animated = document.createElement('span');
    animated.classList.add('buying-signal');
    document.body.append(animated);
    console.log(animated);
}

function cartClick() {
    //cart info visibility
    let isVisible = cartInfo.style.visibility === 'visible';

    if (isVisible) {
        cartInfo.style.visibility = 'hidden';
        cart.removeAttribute('aria-expanded');
    } else {
        cartInfo.style.visibility = 'visible';
        cart.setAttribute('aria-expanded', 'true');
    }
}


function deleteProducts() {
    cartMain.hidden = true;
    cartMain.style.display = 'none';
    cartEmpty.hidden = false;
    cartEmpty.style.display = 'flex';

    notification.remove();
    notification = null;
}