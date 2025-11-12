import { createAction, props } from '@ngrx/store';

export const incrementar = createAction('[Contador] Incrementar');
export const decrementar = createAction('[Contador] Decrementar');

export const multiplicar = createAction(
    '[Contador] Multiplicar',
    props<{ valor: number }>()
);
export const dividir = createAction(
    '[Contador] Dividir',
    props<{ valor: number }>()
);

export const resetear = createAction('[Contador] Resetear');