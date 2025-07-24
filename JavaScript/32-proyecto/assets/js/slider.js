window.addEventListener("load", () => {

    let btnPrev = document.querySelector(".slider__btn-prev");
    let btnNext = document.querySelector(".slider__btn-next");
    let slides = document.querySelectorAll(".slides__item");

    let counter = 0;
    let totalSlides = slides.length;

    //Boton Siguiente
    btnNext.addEventListener("click", () =>{

        counter++;

        if (counter >= totalSlides) {
            counter = 0;
        }

        activateSlider(counter);

    });

    //Boton Anterior
    btnPrev.addEventListener("click", () =>{

        counter--;

        if (counter < 0 ) {
            counter = totalSlides - 1;
        }
        
        activateSlider(counter);

    });

    //Activar slider
    let activateSlider = (index) => {
        clearActive();
        slides[index].classList.add("slides__item--active");
    }

    //Limpiar los slides activos
    let clearActive = () => {
        slides.forEach(slide => {
            slide.classList.remove("slides__item--active");
        });
    };
    
});