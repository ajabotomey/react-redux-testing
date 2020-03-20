import tv4 from 'tv4';
import stateSchema from './stateSchema';

export default ( { dispatch, getState } ) =>  next => action => {
  // Need to send the action off first so we can get the updated redux state
  next(action);

  if (!tv4.validate(getState(), stateSchema)) {
    console.warn('Invalid state schema detected!');
  }
}