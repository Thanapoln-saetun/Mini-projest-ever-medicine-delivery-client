import React from 'react'
import { useSelector } from 'react-redux'//เข้าถึง store ที่เก็บไว้ใน redux
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({children}) => {//เป็นการกำหนด route ให้กับ user
    const { user } = useSelector((state)=> ({...state}))
    console.log('userRoute',children)

    return user && user.token 
    ? children //ถ้ามี user และมี token ให้แสดง HomeUser (Element ลูก)
    : <LoadingToRedirect />
}

export default UserRoute
