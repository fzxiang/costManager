/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function getTimeState() {
  // 获取当前时间
  const timeNow = new Date();
  // 获取当前小时
  const hours = timeNow.getHours();
  // 设置默认文字
  let text = ``;
  let status = 'day';
  // 判断当前时间段
  if (hours >= 0 && hours <= 6) {
    text = `凌晨了...`;
    status = 'night';
  } else if (hours >= 6 && hours <= 10) {
    text = `早上好！`;
    status = 'day';
  } else if (hours > 10 && hours <= 14) {
    text = `中午好！`;
    status = 'day';
  } else if (hours > 14 && hours <= 18) {
    text = `下午好！`;
    status = 'day';
  } else if (hours > 18 && hours <= 22) {
    text = `晚上好！`;
    status = 'night';
  } else if (hours > 22 && hours <= 24) {
    text = `半夜了...`;
    status = 'night';
  }
  // 返回当前时间段对应的状态
  return { text, status };
}

export const dateUtil = dayjs;
