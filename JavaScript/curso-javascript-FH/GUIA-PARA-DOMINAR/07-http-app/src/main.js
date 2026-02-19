import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
//import { DragonBallApp } from './dragon-ball/dragon-ball-app.js';
import { UsersApp } from './users/users-app.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <p id="loading"></p>
    <div class="card">
    </div>
  </div>
`

const element = document.querySelector('.card');


UsersApp( element );
//DragonBallApp( element );
