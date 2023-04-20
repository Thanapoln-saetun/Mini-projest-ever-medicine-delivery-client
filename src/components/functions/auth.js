import axios from "axios";

export const register = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/register", value);//สมัครสมาชิก

export const login = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/login", value);//เข้าสู่ระบบ

export const currentUser = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_API + "/current-user",//ผู้ใช้ปัจจุบัน
    {},
    {
      headers: {
        authtoken, //ส่งค่า authtoken ไปให้ server เพื่อเช็คว่าเป็น user หรือไม่
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_API + "/current-admin",//ผู้ดูแลระบบปัจจุบัน 
    {},
    {
      headers: {
        authtoken, //ส่งค่า authtoken ไปให้ server เพื่อเช็คว่าเป็น admin หรือไม่
      },
    }
  );
}
