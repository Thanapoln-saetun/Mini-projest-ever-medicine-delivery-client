export function userReducer(state = null, action) {//สร้าง state ของ user
  switch (action.type) {
    case "LOGIN":
      return action.payload;//เก็บค่า token, username, role
    case "LOGOUT":
      localStorage.clear()//ลบค่า token ใน localstorage
      return action.payload;//ค่า null
    default:
      return state;
  }
}
