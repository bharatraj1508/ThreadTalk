import { format } from 'date-fns';

export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else {
    return (num / 1000000000).toFixed(1) + 'b';
  }
}

export function formatDate(timestamp: string): string {
  return format(new Date(timestamp), 'hh:mm a - MMM dd, yyyy');
}
