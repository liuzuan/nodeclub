import * as type from './action-type';

/**
 * 保存用户登录信息
 */
export const saveUserInfo = (payload) => {
  return {
    type: type.SAVEUSERINFO,
    payload,
  }
}

/**
 * 清除用户登录信息
 */
export const clearUserInfo = () => {
  return {
    type: type.CLEARUSERINFO,
    userInfo: {
      accessToken: '',
      avatar_url: '',
      id: '',
      loginname: '',
      success: false,
    }
  }
}

/**
 * 记录滚动条位置
 * 
 */
export const saveScrollBar = (payload) => {
  return {
    type: type.SAVESCROLLBAR,
    payload,
  }
}

/**
 * 保存首页数据
 */
export const saveHomeData = (payload) => {
  return {
    type: type.SAVEHOMEDATA,
    payload,
  }
}

/**
 * 保存首页数据
 */
export const saveHomeTab = (payload) => {
  return {
    type: type.SAVEHOMETAB,
    payload,
  }
}



