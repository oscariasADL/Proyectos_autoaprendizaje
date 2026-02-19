
/* DESESTRUTURACION DE OBJETOS */

interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details
}

interface Details {
    author: string;
    year: number;
}

const audioPLayer: AudioPlayer =  {
    audioVolume: 90,
    songDuration: 36,
    song: "Never Gonna Give You Up",
    details: {
        author: "Rick Astley",
        year: 1987
    }
}

/* Forma pro de hacer, haciendo desestructuracion*/

const { song } = audioPLayer;



/* Forma pro de hacerlo*/

const { song:nameSong, songDuration:totalDuration } = audioPLayer;
const { author:principalAuthor } = audioPLayer.details;

/* Ambas formas son validas para desestructurar un arreglo de un objeto esta es mas aplicada
const { song:nameSong, songDuration:totalDuration, details } = audioPLayer;
const { author:principalAuthor } = details;
*/

console.log('Song: ', nameSong, '| Total duration: ', totalDuration, ' | Author: ', principalAuthor)


/* Forma Basica de hacerlo */
console.log('*************')
console.log('Song: ', audioPLayer.song)
console.log('Duration: ', audioPLayer.songDuration)
console.log('Author: ', audioPLayer.details.author)




/* DESESTRUCTURACION DE ARREGLOS */

console.log('*************')

/* Forma Basica
const dbz: string[] = ['Goku', 'Vegeta', 'Gohan', 'Trunks']
console.warn('Personaje 3:', dbz[3] || 'No hay personaje')
*/

const [ , , p3, trunks = 'No hay personaje' ]: string[] = ['Goku', 'Vegeta', 'Gohan', 'Trunks']
console.log('Personaje 3:', p3)
console.log('Personaje 4:', trunks)





export{};