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
        ...state,
        ...action.userInfo,
      };
    default:
      return state;
  }
}

export const home = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVESCROLLBAR:
      return {
        ...state,
        ...{scrollBar: action.payload},
      }
    case type.SAVEHOMEDATA:
      return {
        ...state,
        ...{data: action.payload}
      }
    case type.SAVEHOMETAB:
      return {
        ...state,
        ...{tab: action.payload}
      }
    default:
      return state;
  }
}