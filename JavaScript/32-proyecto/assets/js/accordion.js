let collapses = document.querySelectorAll('.accordion__collapse')

collapses.forEach(collapse => {
    let header = collapse.querySelector('.collapse__header')


    header.addEventListener('click', () => {
        collapse.classList.toggle('accordion__collapse--open')
    })
});