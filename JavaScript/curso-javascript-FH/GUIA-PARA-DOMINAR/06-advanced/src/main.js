import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

//import { environmentsComponent } from '../src/concepts/01-enviroments.js';
//import { callbacksComponent } from './concepts/02-callbacks.js';
//import { promiseComponent } from './concepts/03-promises.js';
//import { promiseRaceComponent } from './concepts/04-promise-race.js';
//import { asyncComponent } from './concepts/05-async.js';
//import { asyncAwaitComponent } from './concepts/06-async-await.js';
import { asyncAwait2Component } from './concepts/07-async-await.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
    </div>

  </div>
`;

const element = document.querySelector('.card');

//environmentsComponent( element );
//callbacksComponent( element );
//promiseComponent( element );
//promiseRaceComponent( element );
//asyncComponent( element );
//asyncAwaitComponent( element );
asyncAwait2Component( element );
