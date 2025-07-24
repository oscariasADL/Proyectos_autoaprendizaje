//Scroll top suavisado
window.addEventListener("load", () => {
    let btnScrollTop = document.querySelector(".footer__top");


    //Evento click
    btnScrollTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});