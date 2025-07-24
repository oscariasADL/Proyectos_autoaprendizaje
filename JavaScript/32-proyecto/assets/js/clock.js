let clockTime = document.querySelector(".clock__text");

setInterval(() => {

    let myDate = new Date();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let seconds = myDate.getSeconds();

    clockTime.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

}, 1000);