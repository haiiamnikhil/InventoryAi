import { plans } from './payment.actions';
import { on } from '@ngrx/store';
import { selectedPackage } from './payment.state';
import { createReducer } from '@ngrx/store';



const _packageReducer = createReducer(selectedPackage, on(plans, (state) => {
    return{
        package: state.package = 'Basic'
    }
}))

export function packageReducer(state, action){
    return _packageReducer(state,action);
}