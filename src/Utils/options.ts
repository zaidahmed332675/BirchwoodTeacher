import _ from 'lodash';
import { create } from 'react-native-pixel-perfect';

export const NavigationOptions = () => {
  return { headerShown: false };
};

const designResolution = {
  width: 390,
  height: 844,
};

export const pS = create(designResolution);
export const perfectSize = create(designResolution);

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

export const isArrayOfObjectsEqual = (
  x: Record<string, any>[],
  y: Record<string, any>[],
  comparator: string[]
) => {
  const pickProps = (obj: Record<string, any>, props: string[]) =>
    _.pick(obj, props);
  const xProps = x.map(obj => pickProps(obj, comparator));
  // our new object already in proper shape with required props
  // const yProps = y.map(obj => pickProps(obj, keys));
  return _.isEqual(xProps, y);
};
