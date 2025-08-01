import React, { useEffect, useState } from 'react'
import "./ManageUsers.css"
import UserList from '../../components/UserList/UserList'
import UserForm from '../../components/UserForm/UserForm'
import { fetchUsers } from '../../Service/UserService'
import toast from 'react-hot-toast'

const ManageUsers = () => {
  
  const [users, setUsers] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
     async function loadUsers() {
        try{
          setLoading(true);
          const response = await fetchUsers();
          setUsers(response.data);
        } catch(error){
          console.log(error);
          toast.error("Unable to fetch users");
        }
     }

     loadUsers();
  },[])
  return (
     <div className="users-container text-light">
        <div className="left-column">
           <UserForm setUsers= {setUsers}/> 
        </div>
        <div className="right-column">
          <UserList users={users} setUsers={setUsers } />
        </div>
    </div>
  )
}

export default ManageUsers