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
 * 保存首页数据
 */
export const saveHomeState = (payload) => {
  return {
    type: type.SAVEHOMESTATE,
    payload,
  }
}

/**
 * 保存主题详情页数据
 */
export const saveTopicState = (payload) => {
  return {
    type: type.SAVETOPICSTATE,
    payload,
  }
}







