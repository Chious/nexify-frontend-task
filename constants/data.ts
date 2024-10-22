import { Column, Tools } from '@/components/table';

// this is fake data to testing ui

export const data = [
  {
    name: 'John Doe',
    birthday: '01/01/1990',
    salary: '$100,000',
    address: '1234 Elm St.',
  },
];

export const columns: Column[] = [
  {
    header: 'Name',
    accessor: 'Name',
    inputType: 'text',
    rule: /^[a-zA-Z ]+$/, // only letters and space
  },
  {
    header: 'Birthday',
    accessor: 'DateOfBirth',
    inputType: 'date',
    rule: /^(19[0-9]{2}|20[0-2][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, // 1900/1/1-2029/12/31
  },
  {
    header: 'Salary',
    accessor: 'Salary',
    inputType: 'range',
    rule: /^[0-9]+$/, // only numbers
  },
  {
    header: 'Address',
    accessor: 'Address',
    inputType: 'text',
    rule: /^\d+\s[A-Za-z0-9\s.]+,\s[A-Za-z\s]+,\s[A-Z]{2}\s\d{5}(-\d{4})?$/, // check if address is valid in us
  },
];

export const tools: Tools[] = [
  {
    variant: 'blue',
    text: 'Add',
    clickFunc: () => {},
  },
  {
    variant: 'green',
    text: 'Edit',
    clickFunc: () => {},
  },
  {
    variant: 'red',
    text: 'Delete',
    clickFunc: () => {},
  },
];
