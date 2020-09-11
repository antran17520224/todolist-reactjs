import { createStore } from 'redux'
import { sort, status } from './actions/index'
import myReducer from './reducers/index'


const store = createStore(myReducer);
console.log('Default : ', store.getState());
//TOGGLE STATUS
store.dispatch(status());
console.log('New State : ', store.getState());
//SORT NAME Z-A
store.dispatch(sort({
    by : 'name',
    value : -1,
}))
console.log('New State SORT : ', store.getState());


