import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceToNow } from 'date-fns';
import _ from 'lodash';
import { colors } from '../Theme/colors';

export const NavigationOptions = () => {
  return { headerShown: false };
};

export const capitalizeWords = (str: string = '') => {
  if (!str) {
    return '';
  }
  return str
    .split(' ')
    .map((word: string) => _.capitalize(word))
    .join(' ');
};

export const attendanceEnum = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LEAVE: 'LEAVE',
  HOLIDAY: 'HOLIDAY',
} as const as {
  readonly [index: string]: string;
};

export const leaveTypeEnum = {
  SICK: 'SICK',
  CASUAL: 'CASUAL',
  ANNUAL: 'ANNUAL',
} as const as {
  readonly [index: string]: string;
};

export const HomeWorkTypeEnum = {
  HOMEWORK: 'HOMEWORK',
  NOTICE: 'NOTICE',
  WARNING: 'WARNING',
} as const as {
  readonly [index: string]: string;
};

export const DaysEnum = {
  MON: 'MON',
  TUE: 'TUE',
  WED: 'WED',
  THU: 'THU',
  FRI: 'FRI',
} as const as {
  readonly [index: string]: string;
};

export const isArrayOfObjectsEqual = (
  x: Record<string, any>[],
  y: Record<string, any>[],
  comparator: string[]
) => {
  const pickProps = (obj: Record<string, any>, props: string[]) =>
    _.pick(obj, props);
  const xProps = x.map(obj => pickProps(obj, comparator));
  const yProps = y.map(obj => pickProps(obj, comparator));
  return _.isEqual(xProps, yProps);
};

export const formatCommentTime = (createdAt: string) => {
  const now = new Date();
  const commentDate = new Date(createdAt)
  const seconds = differenceInSeconds(now, commentDate);
  const minutes = differenceInMinutes(now, commentDate);
  const hours = differenceInHours(now, commentDate);
  const days = differenceInDays(now, commentDate);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    // For dates older than 7 days, you can use formatDistanceToNow or another format
    return formatDistanceToNow(commentDate, { addSuffix: true });
  }
}

export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
export const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];

export const isImage = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return imageExtensions.includes(extension || '');
};

export const isVideo = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return videoExtensions.includes(extension || '');
};

export const getCheckInBtnColor = (status: string) => {
  switch (status) {
    case attendanceEnum.PRESENT:
      return colors.theme.darkGreen;
    case attendanceEnum.ABSENT:
      return colors.theme.darkRed;
    case attendanceEnum.LEAVE:
      return colors.theme.secondary;
    default:
      return colors.theme.primary
  }
}

export const getCheckInBtnLabel = (status: string) => {
  switch (status) {
    case attendanceEnum.PRESENT:
      return "Checked In";
    case attendanceEnum.ABSENT:
      return "Absent";
    case attendanceEnum.LEAVE:
      return "On Leave";
    default:
      return "Check In";
  }
}