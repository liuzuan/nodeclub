import * as type from './action-type';

let defaultState = {

}
/**
 * 用户登录信息
 * userInfo: {
      accessToken: '',
      avatar_url: '',
      id: '',
      loginname: '',
      success: false,
    }
 */
export const userInfo = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVEUSERINFO://登录保存信息
      return {
        ...state,
        ...action.payload,
      };
    case type.CLEARUSERINFO://退出清除登录信息
      return {
        ...state,
        ...action.userInfo,
      };
    default:
      return state;
  }
}

/**
 * 首页数据
 * home: {
      state: {},
      scrollBar: {},
    }
 */
export const home = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVESCROLLBAR://记录首页滚动条位置
      return {
        ...state,
        ...{scrollBar: action.payload},
      }
    case type.SAVEHOMESTATE://记录首页数据
      return {
        ...state,
        ...{state: action.payload}
      }
    default:
      return state;
  }
}