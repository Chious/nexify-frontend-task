'use client';
import Button from './ui/button';
import Input from './ui/input';

export type Data = {
  [key: string]: string | number;
  Name: string;
  DateOfBirth: string;
  Salary: number;
  Address: string;
};

export type Column = {
  header: string;
  accessor: string;
  inputType?: 'text' | 'date' | 'range';
  rule?: RegExp;
};

export type Tools = {
  variant: 'blue' | 'green' | 'red';
  text: string;
  clickFunc: () => void;
};

interface TableProps {
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  columns: Column[];
  tools?: Tools[];
}

const Table: React.FC<TableProps> = ({ data, setData, columns, tools }) => {
  return (
    <div className="bg-white rounded-md w-fit p-4 h-96 overflow-scroll">
      <Toolbar tools={tools} />
      <table className="bg-white rounded-md h-96 overflow-scroll">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.accessor}
                className="w-40 p-2 border-b border-solid border-gray"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(column => (
                  <td
                    key={column.accessor}
                    className="w-40 p-2 border-b border-solid border-gray align-middle text-center"
                  >
                    <Input
                      type={column.inputType ?? 'text'}
                      value={row[column.accessor]}
                      onChange={e => {
                        const newData = [...data];
                        newData[rowIndex][column.accessor] = e.target.value;
                        setData(newData);
                      }}
                      errorMsg={`Invalid ${column.header}!`}
                      rule={column.rule || /^(.*)$/}
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Toolbar: React.FC<{ tools?: Tools[] }> = ({ tools }) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      {tools &&
        tools.map((tool, index) => (
          <Button key={index} variant={tool.variant} onClick={tool.clickFunc}>
            {tool.text}
          </Button>
        ))}
    </div>
  );
};

export default Table;
