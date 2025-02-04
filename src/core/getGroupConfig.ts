import { MiraiError } from '../Error'
import axios from 'axios'
import { GroupID, GroupInfo } from '../Base'
/**
 *  获取群信息
 * @param option 选项
 * @param option.httpUrl    mirai-api-http server 的地址
 * @param option.sessionKey 会话标识
 * @param option.target     群号
 * @returns 群信息
 */
export default async ({
  httpUrl,
  sessionKey,
  target
}: {
  httpUrl: string
  sessionKey: string
  target: GroupID
}): Promise<GroupInfo> => {
  // 请求
  const responseData = await axios.get<
    GroupInfo & {
      code?: number
      msg?: string
    }
  >(new URL('/groupConfig', httpUrl).toString(), {
    params: { sessionKey, target }
  })
  const { data } = responseData
  // 抛出 mirai 的异常
  if (data.code && data.code != 0) {
    throw new MiraiError(data.code, data.msg ?? '')
  }
  return data
}
