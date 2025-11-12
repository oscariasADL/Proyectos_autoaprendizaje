import { createAction, props } from "@ngrx/store";

export const crearTodo = createAction(
    '[TODO] Crear todo',
    props<{ texto: string }>()
);