(() =>{

    let avengers:number = 5;
    const villanos:number = 20;

    if(avengers < villanos){
        console.log("Estamos en problemas");
    }else{
        console.log("Nos salvamos");
    }

    avengers = Number('55A');

    console.log({avengers});

})();