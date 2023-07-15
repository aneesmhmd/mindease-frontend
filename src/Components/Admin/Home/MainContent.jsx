import React, { useState } from 'react';
import Table from './Table';
import AddUserModal from './AddUserModal';

const MainContent = () => {
    const [modal,setModal] = useState(false)
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Heading</h2>
      <div className="mb-4">
        <button onClick={()=>{setModal(!modal)}} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Add User
        </button>
      </div>
      <Table/>
      {modal && <AddUserModal />}
    </div>
  );
};

export default MainContent;
