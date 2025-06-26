
class CarouselElement
{
    constructor(imgRef, name, description, links)
    {
        this.imgRef = imgRef;
        this.name = name;
        this.description = description;
        this.links = links;
    }
    
}
function CreateCarousel(section, elements)
{        
  const parent = document.createElement("div");
  parent.className = "game-carousel-container";
  section.appendChild(parent);

  const carousel = document.createElement("div");
  carousel.classList.add("game-carousel");
  carousel.id = "gameCarousel";
  parent.appendChild(carousel);

  carousel.appendChild(newElement(elements[elements.length - 1], true));

  elements.forEach(element => {
    // Append to the container
    carousel.appendChild(newElement(element, false));
  });

  carousel.appendChild(newElement(elements[0], true));


  const leftBtn = document.createElement("button");
  leftBtn.className = "carousel-btn left-btn";
  leftBtn.innerHTML = "🠼";

  const rightBtn = document.createElement("button");
  rightBtn.className = "carousel-btn right-btn";
  rightBtn.innerHTML = "🠾";

  parent.appendChild(leftBtn);
  parent.appendChild(rightBtn);
  
  const totalSlides = elements.length + 2;
  const slideWidth = 100;
  let index = 1; // Start at first real slide
  let isTransitioning = false;
  let autoPlayTimer = null;

  function goToSlide(i) {
    carousel.style.transition = 'transform 0.4s ease';
    carousel.style.transform = `translateX(-${i * slideWidth}%)`;
    index = i;
  }

  function nextSlide() {
    if (isTransitioning) return;
    if(index === totalSlides - 1) return;
    goToSlide(index + 1);
  }

  function prevSlide() {
    if (isTransitioning) return;
    if(index === 0) return;
    goToSlide(index - 1);
  }

  function wrapSlides() {
    isTransitioning = true;
    carousel.addEventListener('transitionend', () => {
      if (index === totalSlides - 1) {
        carousel.style.transition = 'none';
        index = 1;
        carousel.style.transform = `translateX(-${index * slideWidth}%)`;
      } else if (index === 0) {
        carousel.style.transition = 'none';
        index = totalSlides - 2;
        carousel.style.transform = `translateX(-${index * slideWidth}%)`;
      }
      isTransitioning = false;
      console.log(index);
    }, { once: true });
  }

  function newElement(elementDesc, clone)
  {
        const newGameSlide = document.createElement('div');
        newGameSlide.className = 'game-slide';

        if(clone)
            newGameSlide.classList.add("clone");

        // Create the image element
        const img = document.createElement('img');
        img.src = elementDesc.imgRef;
        img.alt = 'Clone Last';

        // Create the game-info container
        const gameInfo = document.createElement('div');
        gameInfo.className = 'game-info';

        const wrapper = document.createElement('div');
        wrapper.className = "game-info-text";

        // Add title and description
        const title = document.createElement('h3');
        title.textContent = elementDesc.name;

        const description = document.createElement('p');
        description.textContent = elementDesc.description;

        const refs = document.createElement("div");
        refs.className = "game-info-refs"

        elementDesc.links.forEach((link) =>
        {
            const button = document.createElement("a");
            button.className = "external-link-carousel";
            button.innerText = link.name;
            button.href = link.href;
            button.target = "_blank";

            refs.appendChild(button);
        });

        wrapper.appendChild(title);
        wrapper.appendChild(description);
        // Assemble the game-info

        gameInfo.appendChild(refs);
        gameInfo.appendChild(wrapper);
        

        // Assemble the new game slide
        newGameSlide.appendChild(img);
        newGameSlide.appendChild(gameInfo);
        return newGameSlide;
  }

  leftBtn.addEventListener('click', prevSlide);
  rightBtn.addEventListener('click', nextSlide);

  carousel.addEventListener('transitionend', wrapSlides);

  // Swipe support
  let touchStartX = null;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', e => {
    if (!touchStartX) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) prevSlide();
    else if (deltaX < -50) nextSlide();
    touchStartX = null;
  });

  // Autoplay
  function startAutoplay() {
    autoPlayTimer = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoPlayTimer);
  }

  parent.addEventListener('mouseenter', stopAutoplay);
  parent.addEventListener('mouseleave', startAutoplay);

  // Init
  window.addEventListener('load', () => {
    carousel.style.transform = `translateX(-${index * slideWidth}%)`;
    startAutoplay();
  });
}