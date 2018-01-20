import * as type from './action-type';

// 保存用户信息
export const saveUserInfo = (userInfo) => {
  return {
    type: type.SAVEUSERINFO,
    userInfo,
  }
}

export const clearUserInfo = (userInfo) => {
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

