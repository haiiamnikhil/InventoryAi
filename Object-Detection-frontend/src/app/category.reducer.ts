export interface CategorySelectorState{
    category:string;
}


export function rootReducer(state:CategorySelectorState, action) : CategorySelectorState{
    switch (action.type) {
        case 'single' : return {category: state.category}
        case 'multiple' : return {category: state.category}
        default: return state
    }

}