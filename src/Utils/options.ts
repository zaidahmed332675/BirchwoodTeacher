import { create } from 'react-native-pixel-perfect';

export const NavigationOptions = () => {
  return { headerShown: false };
};

const designResolution = {
  width: 390,
  height: 844,
};

export const pS = create(designResolution);

export const dummyRecords = [
  { label: 'John', value: 'john', rollNumber: 1 },
  { label: 'Michael', value: 'michael', rollNumber: 2 },
  { label: 'Sarah', value: 'sarah', rollNumber: 3 },
  { label: 'David', value: 'david', rollNumber: 4 },
  { label: 'Emily', value: 'emily', rollNumber: 5 },
  { label: 'Daniel', value: 'daniel', rollNumber: 6 },
  { label: 'Jessica', value: 'jessica', rollNumber: 7 },
  { label: 'Ryan', value: 'ryan', rollNumber: 8 },
  { label: 'Emma', value: 'emma', rollNumber: 9 },
  { label: 'Matthew', value: 'matthew', rollNumber: 10 },
  { label: 'Jennifer', value: 'jennifer', rollNumber: 11 },
  { label: 'Christopher', value: 'christopher', rollNumber: 12 },
  { label: 'Amanda', value: 'amanda', rollNumber: 13 },
  { label: 'James', value: 'james', rollNumber: 14 },
  { label: 'Elizabeth', value: 'elizabeth', rollNumber: 15 },
  { label: 'Justin', value: 'justin', rollNumber: 16 },
  { label: 'Lauren', value: 'lauren', rollNumber: 17 },
  { label: 'William', value: 'william', rollNumber: 18 },
  { label: 'Olivia', value: 'olivia', rollNumber: 19 },
  { label: 'Andrew', value: 'andrew', rollNumber: 20 },
];
