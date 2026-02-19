(() =>{

    const batman: string = "Batman";
    const superman: string = "Superman";
    const flash: string = "Flash";

    console.log(batman.toUpperCase());
    console.log(batman[10]?.toUpperCase() || 'No existe esa letra');
})();