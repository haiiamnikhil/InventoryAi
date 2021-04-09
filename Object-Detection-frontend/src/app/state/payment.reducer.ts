import { basic, premium, professional } from './payment.actions';
import { on } from '@ngrx/store';
import { selectedPackage } from './payment.state';
import { createReducer } from '@ngrx/store';


const _packageReducer = createReducer(selectedPackage,
    on(basic, (state) => {return{package: state.package = 'Basic'}}),
    on(premium,(state) => {return{package: state.package = 'Premium'}}),
    on(professional, (state) => {return{package: state.package = 'Professional'}})
    )

export function packageReducer(state, action){
    return _packageReducer(state,action);
}