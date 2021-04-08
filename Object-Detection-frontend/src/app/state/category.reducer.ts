import { multiple, single } from './category.actions';
import { initialCategory } from './category.state';
import { createReducer, on } from "@ngrx/store";

const _categoryReducer = createReducer(initialCategory, on(single, (state) =>{
    return {
        category: state.category = 'single'
    }
}),on(multiple, (state) =>{
    return{
        category: state.category = 'multiple'
    }
}))

export function categoryReducer(state, action){
    return _categoryReducer(state, action)
}