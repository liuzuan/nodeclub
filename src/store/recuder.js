import * as type from './action-type';

let defaultState = {

}

export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVEUSERINFO:
      return {
        ...state,
        ...action.userInfo,
      };
    case type.CLEARUSERINFO:
      return {
        ...state,
        ...action.userInfo,
      }  
    default:
      return state;  
  }
}