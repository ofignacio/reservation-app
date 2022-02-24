import {COMPLETE_DAYS, COMPLETE_MONTHS} from '../config/constants';

export const nowLocale = () => {
  const date = new Date();
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = `${date.getHours()}`;
  let minute = `${date.getMinutes()}`;
  let seconds = `${date.getSeconds()}`;
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  if (seconds.length < 2) seconds = `0${seconds}`;
  return `${[day, month, year].join('/')} ${[hour, minute, seconds].join(':')}`;
};

export const DBDateToJs = dt => {
  const date = new Date(dt);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = `${date.getHours()}`;
  let minute = `${date.getMinutes()}`;
  let seconds = `${date.getSeconds()}`;
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  if (seconds.length < 2) seconds = `0${seconds}`;
  return `${[day, month, year].join('/')} ${[hour, minute].join(':')}`;
};

export const DBDateToTimeJs = dt => {
  const date = new Date(dt);
  let hour = `${date.getHours()}`;
  let minute = `${date.getMinutes()}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  return `${[hour, minute].join(':')}`;
};

export const DBDateToLetterUy = dt => {
  const date = new Date(dt);
  return `${COMPLETE_DAYS[date.getDay()]} ${date.getDate()} de ${
    COMPLETE_MONTHS[date.getMonth()]
  }`;
};

export const diff_minutes = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};
