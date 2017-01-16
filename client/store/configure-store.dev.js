import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'ducks';
import { persistState } from 'redux-devtools';
import DevTools from 'containers/devtools/devtools';

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/,
        ),
      ),
    ),
  );

  return store;
}
