import { legacy_createStore as createStore} from 'redux';
import { Store } from 'redux';
import { contadorReducer } from './contador/contador.reducer.ts';
import { incrementadorAction } from './contador/contador.actions.ts';

const store: Store = createStore( contadorReducer );

store.subscribe(
    () => {
        console.log('Subs:', store.getState() );
    }
)

store.dispatch( incrementadorAction );
console.log( store.getState() );