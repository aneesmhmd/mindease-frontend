import React from 'react';

const AddUserModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-md">
        <span className="text-xl font-bold mb-4">Add User</span>

        <form className='flex flex-col'>
          <input className='mb-2' type="text" name="a" id="a"  placeholder='name'/>
          <input type="text" name="a" id="a"  placeholder='name'/>
          <input type="text" name="a" id="a"  placeholder='name'/>
          <input type="text" name="a" id="a"  placeholder='name'/>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
