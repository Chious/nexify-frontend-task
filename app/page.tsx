'use client';

import { useCallback, useMemo } from 'react';
import Table, { Tools, Data } from '@/components/table';
import { columns } from '@/constants/data';
import { useState } from 'react';
import { apiRequest } from '@/utils/apiReq';
import Swal from 'sweetalert2';
import { DateToTime, TimetoDate } from '@/utils/utils';

export default function Home() {
  const [userData, setUserData] = useState<Data[]>([]);

  const getData = useCallback(async () => {
    try {
      const res = await apiRequest<Data[]>('get', '/api/Record/GetRecords');
      setUserData(
        res.map(row => ({ ...row, DateOfBirth: TimetoDate(row.DateOfBirth) }))
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const saveData = useCallback(async () => {
    if (!validate(userData)) return;

    try {
      await apiRequest<Data[]>(
        'post',
        '/api/Record/SaveRecords',
        userData.map(row => ({
          ...row,
          DateOfBirth: DateToTime(row.DateOfBirth),
        }))
      );
      Swal.fire('Success', 'Data saved successfully', 'success');
    } catch (error: string | any) {
      Swal.fire('Error', error, 'error');
    }
  }, [userData]);

  const tools = useMemo<Tools[]>(
    () => [
      {
        variant: 'blue',
        text: 'Add',
        clickFunc: () => {
          setUserData([
            { Name: '', DateOfBirth: '', Salary: 0, Address: '' },
            ...userData,
          ]);
        },
      },
      {
        variant: 'green',
        text: 'Save',
        clickFunc: () => {
          saveData();
        },
      },
      {
        variant: 'red',
        text: 'Update',
        clickFunc: () => {
          getData();
        },
      },
    ],
    [userData, saveData, getData]
  );

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Table
        data={userData}
        setData={setUserData}
        columns={columns}
        tools={tools}
      />
    </main>
  );
}

const validate = (data: Data[]) => {
  for (const row of data) {
    for (const key in row) {
      if (row[key] === '') {
        Swal.fire('Error', 'Please fill in all fields', 'error');
        return false;
      }
    }

    if (row.Salary < 0) {
      Swal.fire('Error', 'Salary must be greater than 0', 'error');
      return false;
    }

    if (!/^[a-zA-Z ]+$/.test(row.Name)) {
      Swal.fire('Error', 'Name must be letters and space only', 'error');
      return false;
    }

    if (
      !/^(19[0-9]{2}|20[0-2][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(
        row.DateOfBirth
      )
    ) {
      Swal.fire('Error', 'Invalid date format', 'error');
      return false;
    }

    if (
      !/^\d+\s[A-Za-z0-9\s.]+,\s[A-Za-z\s]+,\s[A-Z]{2}\s\d{5}(-\d{4})?$/.test(
        row.Address
      )
    ) {
      Swal.fire('Error', 'Invalid US address format', 'error');
      return false;
    }
  }
  return true;
};
