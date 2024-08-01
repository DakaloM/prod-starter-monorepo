export function formatDate(date: string, withTime?: boolean): string {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const newDate = withTime
    ? `${new Date(date).toDateString()} ${hours}:${minutes}`
    : new Date(date).toDateString();

  return newDate;
}

export function formatDateSimple(date: string, withTime?: boolean): string {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const newDate = withTime
    ? year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    : `${year}${month}${day}`;

  return String(newDate);
}

export function formatDateStandard(date: string) {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const newDate = `${year}/${month}/${day}`;

  return String(newDate);
}
