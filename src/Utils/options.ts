import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceToNow } from 'date-fns';
import _ from 'lodash';
import { colors } from '../Theme/colors';

export const NavigationOptions = () => {
  return { headerShown: false };
};

export const dummyRecords = [
  {
    _id: 1,
    label: 'John Abraham',
    value: 'john Abraham',
    rollNumber: 1,
    class: 'X1-B',
    isPresent: true,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 2,
    label: 'Michael',
    value: 'michael',
    rollNumber: 2,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 3,
    label: 'Sarah',
    value: 'sarah',
    rollNumber: 3,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: true,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 4,
    label: 'David',
    value: 'david',
    rollNumber: 4,
    class: 'X1-B',
    isPresent: true,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 5,
    label: 'Emily',
    value: 'emily',
    rollNumber: 5,
    class: 'X1-B',
    isPresent: true,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 6,
    label: 'Daniel',
    value: 'daniel',
    rollNumber: 6,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: true,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 7,
    label: 'Jessica',
    value: 'jessica',
    rollNumber: 7,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 8,
    label: 'Ryan',
    value: 'ryan',
    rollNumber: 8,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 9,
    label: 'Emma',
    value: 'emma',
    rollNumber: 9,
    class: 'X1-B',
    isPresent: false,
    isOnLeave: false,
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 10,
    label: 'Matthew',
    value: 'matthew',
    rollNumber: 10,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 11,
    label: 'Jennifer',
    value: 'jennifer',
    rollNumber: 11,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 12,
    label: 'Christopher',
    value: 'christopher',
    rollNumber: 12,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 13,
    label: 'Amanda',
    value: 'amanda',
    rollNumber: 13,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 14,
    label: 'James',
    value: 'james',
    rollNumber: 14,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 15,
    label: 'Elizabeth',
    value: 'elizabeth',
    rollNumber: 15,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 16,
    label: 'Justin',
    value: 'justin',
    rollNumber: 16,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 17,
    label: 'Lauren',
    value: 'lauren',
    rollNumber: 17,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 18,
    label: 'William',
    value: 'william',
    rollNumber: 18,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 19,
    label: 'Olivia',
    value: 'olivia',
    rollNumber: 19,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
  {
    _id: 20,
    label: 'Andrew',
    value: 'andrew',
    rollNumber: 20,
    class: 'X1-B',
    parentData: {
      parentId: 1,
      parentName: 'Ali Hussain',
    },
  },
];

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

export const formatCommentTime = (commentDate: string) => {
  const now = new Date();
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