import { IUser } from '@/pages/users/interface';
import React from 'react';

interface BoxProps {
  users: IUser[];
}

const List: React.FC<BoxProps> = ({ users }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg h-full flex flex-col">
      <div className="flex font-bold py-2 border-b border-gray-300">
        <div className="flex-1">ID</div>
        <div className="flex-1">Name</div>
        <div className="flex-1">Email</div>
        <div className="flex-1">Level</div>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {users.map((user, index) => (
          <div key={index} className="flex py-2 border-b border-gray-100">
            <div className="flex-1">{index + 1}</div>
            <div className="flex-1">{user.name}</div>
            <div className="flex-1">{user.email}</div>
            <div className="flex-1">{user.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
