
/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const promiseRaceComponent = ( element ) => {

    element.innerHTML = 'Loading...';

    const renderValue = (value) => {
        element.innerHTML = `
            <h3>${ value }</h3>
        `;
    }

    Promise.race([
        slowPromise(),
        mediumPromise(),
        fastPromise()
    ])
    .then( renderValue );

}

const slowPromise = () => new Promise( resolve => {

    setTimeout(
       () => {
            resolve('Slow Promise Resolved');
       }, 3000 
    )

})

const mediumPromise = () => new Promise( resolve => {

    setTimeout(
       () => {
            resolve('Medium Promise Resolved');
       }, 2000 
    )

})

const fastPromise = () => new Promise( resolve => {

    setTimeout(
       () => {
            resolve('Fast Promise Resolved');
       }, 1000
    )

})