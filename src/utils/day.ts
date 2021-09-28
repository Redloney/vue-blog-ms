import dayjs from 'dayjs'
import zhCn from 'dayjs/locale/zh-cn'
dayjs.locale(zhCn)

export const format = (date: string, type: string): string => {
  return dayjs(date).format(type)
}
