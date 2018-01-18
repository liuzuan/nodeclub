import * as type from './action-type';

let defaultState = {
}

export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVEUSERINFO:
      return {
        ...state,
        ...action.payload,
      };
    case type.CLEARUSERINFO:
      return {
        
        // ...action.payload,
      }
    default:
      return state;  
  }
}