import * as type from './action-type';

// 保存用户信息
export const saveUserInfo = (accessToken, userInfo) => {
  return {
    type: type.SAVEUSERINFO,
    payload: {accessToken, userInfo}
  }
}

export const logout = (payload) => {
  return {
    type: type.CLEARUSERINFO,
    payload,
  }
}

