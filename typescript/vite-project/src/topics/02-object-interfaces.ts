//const skills: string[] = ['Bash', 'Counter', 'headling']


// Se puede definir una interfaz para definir la estructura de un objeto
interface Character{
    name: string;
    hp: string;
    skills: string[];
    hometown?: string; // El signo de interrogación indica que esta propiedad es opcional
}


const strider: Character = {
    name: 'Strider',
    hp: '100',
    skills: ['Bash', 'Counter', 'headling']
}

strider.hometown = 'Rivendell'; // Se puede agregar la propiedad opcional

console.table(strider);
