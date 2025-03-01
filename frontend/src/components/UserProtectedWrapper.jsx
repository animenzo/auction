import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import axios from 'axios'
const UserProtectedWrapper = ({children}) => {
    // const {user} = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user,setUser} = useContext(UserDataContext);
    const [isLoading,setIsLoading] = React.useState(true);
    // console.log(token);
   

    useEffect(()=>{
 
        if (!token) {
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers:{
              'Authorization':`Bearer ${token}`
          }
      }).then((response)=>{
          if(response.status === 200){
              const data = response.data
              setUser(data.user)
              setIsLoading(false)
              console.log(data);
              
          }
      }).catch((error)=>{
          console.log(error);
          localStorage.removeItem('token')
          navigate('/login')
      })
    },[token])
    
  if(isLoading){
      return <h1>Loading...</h1>
  }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
