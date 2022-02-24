import {COMPLETE_DAYS} from './constants';

export const jsDateToDB = dt => {
  if (!dt) return null;
  const date = dt;
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${[year, month, day].join('/')}`;
};

export const DBDateToUyJs = dt => {
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${[day, month, year].join('/')}`;
};

export const DBDateToFullUyJs = dt => {
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = `${date.getHours()}`;
  let minute = `${date.getMinutes()}`;
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  return `${[day, month, year].join('/')} ${[hour, minute].join(':')}`;
};

export const addMonth = (dt, months) => {
  const date = new Date(dt);
  date.setMonth(date.getMonth() + parseInt(months, 10));
  return date;
};

export const DBDateToTimeJs = dt => {
  if (!dt) return;
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  let hour = `${date.getHours()}`;
  let minute = `${date.getMinutes()}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  return `${[hour, minute].join(':')}`;
};

export const DBDateToLetterUy = dt => {
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  return `${COMPLETE_DAYS[date.getDay()]} ${date.getDate()}`;
};

export const DBToDay = dt => {
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  return date.getDay();
};

export const jsDateWithTimeToDB = (dt, tm) => {
  let date;
  if (typeof dt === 'string') date = new Date(dt.replace(/-/g, '/'));
  else date = new Date(dt);
  let time;
  if (typeof tm === 'string') time = new Date(tm.replace(/-/g, '/'));
  else time = new Date(tm);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = `${time.getHours()}`;
  let minute = `${time.getMinutes()}`;
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (minute.length < 2) minute = `0${minute}`;
  return `${[year, month, day].join('/')} ${[hour, minute].join(':')}`;
};
