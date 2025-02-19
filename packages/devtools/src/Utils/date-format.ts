import {
  formatDistanceToNow,
  format,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInHours,
} from 'date-fns';

export const formatMessageTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const hoursDiff = differenceInHours(now, date);

  if (hoursDiff < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (isToday(date)) {
    return format(date, 'h:mm a');
  }

  if (isYesterday(date)) {
    return `Yesterday ${format(date, 'h:mm a')}`;
  }

  if (isThisWeek(date)) {
    return format(date, 'EEEE h:mm a');
  }

  return format(date, 'M/d h:mm a');
};
