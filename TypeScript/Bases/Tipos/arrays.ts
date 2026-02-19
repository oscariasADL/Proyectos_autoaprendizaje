(() =>{

    const numbers: number[] = [1,2,3,4,5];
    const strings: string[] = ['Oscar', 'Arias', 'JavaScript', 'TypeScript'];
    const booleans: boolean[] = [true, false, true, true];

    const numbersGeneric: Array<number> = [6,7,8,9,10];
    const stringsGeneric: Array<string> = ['NodeJS', 'React', 'Vue', 'Angular'];
    const booleansGeneric: Array<boolean> = [false, false, true, false];

    //Tuplas (No es muy común su uso)
    let users:(string | number)[] = ['Oscar', 1, 'Arias', 2];
    users.push('Hola');
    users.push(123);
    //users.push(true); //Error


    //Si deseo que una tupla tenga un tipo y orden específico
    //En este caso el primer elemento siempre será un string, el segundo un number y el tercero un boolean
    const hero:[string, number, boolean] = ['Dr. Strange', 100, true];

})();