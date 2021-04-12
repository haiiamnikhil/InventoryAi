import { basic, premium, professional } from './payment.actions';
import { on } from '@ngrx/store';
import { selectedPackage } from './payment.state';
import { createReducer } from '@ngrx/store';


const _packageReducer = createReducer(selectedPackage,
    on(basic, (state) => {return{package: state.package = 'Basic',amount: state.amount = 50}}),
    on(premium,(state) => {return{package: state.package = 'Premium', amount: state.amount = 100}}),
    on(professional, (state) => {return{package: state.package = 'Professional', amount: state.amount = 500}}),
    )
export function packageReducer(state, action){
    return _packageReducer(state,action);
}