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
  { label: 'John', value: 'john' },
  { label: 'Michael', value: 'michael' },
  { label: 'Sarah', value: 'sarah' },
  { label: 'David', value: 'david' },
  { label: 'Emily', value: 'emily' },
  { label: 'Daniel', value: 'daniel' },
  { label: 'Jessica', value: 'jessica' },
  { label: 'Ryan', value: 'ryan' },
  { label: 'Emma', value: 'emma' },
  { label: 'Matthew', value: 'matthew' },
  { label: 'Jennifer', value: 'jennifer' },
  { label: 'Christopher', value: 'christopher' },
  { label: 'Amanda', value: 'amanda' },
  { label: 'James', value: 'james' },
  { label: 'Elizabeth', value: 'elizabeth' },
  { label: 'Justin', value: 'justin' },
  { label: 'Lauren', value: 'lauren' },
  { label: 'William', value: 'william' },
  { label: 'Olivia', value: 'olivia' },
  { label: 'Andrew', value: 'andrew' },
];
