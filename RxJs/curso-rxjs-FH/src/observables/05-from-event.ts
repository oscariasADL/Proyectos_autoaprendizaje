/* FROM EVENT */

import { fromEvent, Observer } from 'rxjs';

const src1$ = fromEvent<MouseEvent>(document, 'click');
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

const observer = {
  next: valor => console.log('next:', valor),
};

src1$.subscribe( observer );

src2$.subscribe( evento => {
  console.log( evento.key )
});