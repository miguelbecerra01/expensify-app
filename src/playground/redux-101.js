//https://redux.js.org/introduction/getting-started
import { createStore } from 'redux';

//to create a store whe need to call to createStore and pass it a function with state default values
//this runs inmediately and defines a state default
//define a default in the state
const store = createStore((state = { count: 0 }, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});


//get the values of the store
console.log(store.getState());

//Actionss - object that gets sent to the store
//like walk, read, increment, decrement, etc, a action changes the store data


//increments the count
//calls an action defined in the createStore
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

//calls reset action
store.dispatch({
    type: 'RESET'
});

//calls decrements action to the count
store.dispatch({
    type: 'DECREMENT'
});

//get the values of the store
console.log(store.getState());