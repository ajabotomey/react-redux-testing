export default ( { dispatch } ) =>  next => action => {
  // Check to see if action has a promise on it's payload property
  if (!action.payload || !action.payload.then) {
    return next(action); // Is there is no promise, send action onto next middleware
  }

  // If it does, wait to resolve and obtain data. 
  action.payload.then(function(response) {
    //Then create a new action with that data and dispatch it
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
}