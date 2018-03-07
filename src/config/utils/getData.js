import axios from '../http'

// 获取首页数据
export const HomeData = (page, tab, limit) => axios('get', '/topics', { page, tab, limit })

// 用户登录
export const Login = (accesstoken) => axios('post', '/accesstoken', { accesstoken })

// 获取主题内容&评论
export const GetTopic = (topicId, accesstoken) => axios('get', '/topic/' + topicId, { accesstoken })

// 收藏主题
export const collect = (accesstoken, topic_id) => axios('post', '/topic_collect/collect', { accesstoken, topic_id })

// 取消收藏主题
export const deCollect = (accesstoken, topic_id) => axios('post', '/topic_collect/de_collect', { accesstoken, topic_id })

// 新建主题
export const createTopic = (accesstoken, title, tab, content) => axios('post', '/topics', { accesstoken, title, tab, content })

// 评论点赞
export const ups = (reply_id, accesstoken) => axios('post', '/reply/' + reply_id + '/ups', { accesstoken })

// 新建评论
export const newReply = (topic_id, accesstoken, reply_id, content) => axios('post', '/topic/' + topic_id + '/replies', { accesstoken, content, reply_id })

// 用户信息
export const user = (loginname) => axios('get', '/user/' + loginname)

// 获取全部消息
export const getMsg = (accesstoken) => axios('get', '/messages', { accesstoken })