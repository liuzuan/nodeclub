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
      scrollBar: {},
      all: {},
      good: {},
      share: {},
      ask: {},
      job: {},
      dev: {},
    }
 */
export const home = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVEHOMESCROLLBAR://记录首页滚动条位置
      return {
        ...state,
        ...{scrollBar: action.payload},
      }
    case type.SAVEHOMESTATE: //记录首页数据
      return {
        ...state,
        ...{[action.payload.tab]: action.payload}
      }
    default:
      return state;
  }
}

/**
 * 主题页数据
 * topic: {
      state: {},
      scrollBar: {},
    }
 */
export const topic = (state = defaultState, action = {}) => {
  switch (action.type) {
    case type.SAVETOPICSCROLLBAR://记录主题页滚动条位置
      return {
        ...state,
        ...{scrollBar: action.payload},
      }
    case type.SAVETOPICSTATE://记录主题页数据
      return {
        ...state,
        ...{state: action.payload}
      }
    default:
      return state;
  }
}