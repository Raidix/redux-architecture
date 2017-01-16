// TODO: configure!
// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../modules';
// import createSagaMiddleware from 'redux-saga';
//
// /**
//  * Creates a preconfigured store.
//  */
// export default function configureStore(initialState) {
//   const sagaMiddleware = createSagaMiddleware();
//
//   const store = createStore(
//     rootReducer,
//     initialState,
//
//     applyMiddleware(thunkMiddleware, sagaMiddleware)
//   );
//
//   store.runSaga = sagaMiddleware.run;
//
//   return store;
// }
