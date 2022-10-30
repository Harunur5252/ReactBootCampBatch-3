import { LOGIN, LOGOUT, REGISTER, USER_CONTACTS, USER_CONTACT_DELETE } from "./authType";


export const authReducer = (state,action) => {
    const {type,payload} = action

  switch (type) {
    case USER_CONTACTS:
        return [payload]

    case USER_CONTACT_DELETE:
        const updatedContacts = state.filter(userContact => userContact.id !== payload)
        return [...updatedContacts]

    case REGISTER:
         const {data : {user:registerUser,jwt:registerUserJwt},setUser:setRegisterUser,setToken:setRegisterToken} = payload

         // setting data to localStorage
         localStorage.setItem('user',JSON.stringify(registerUser))
         localStorage.setItem('token',JSON.stringify(registerUserJwt))
         
        // setting registerUser and registerUserJwt(json web token) to state for tracking
        setRegisterUser(registerUser)
        setRegisterToken(registerUserJwt)
        break;

    case LOGIN:
          const {data : {user:loginUser,jwt:loginUserJwt},setUser:setLoginUser,setToken:setLoginToken} = payload
 
          // setting data to localStorage
          localStorage.setItem('user',JSON.stringify(loginUser))
          localStorage.setItem('token',JSON.stringify(loginUserJwt))
          
         // setting loginUser and loginUserJwt(jwt : json web token) to state for tracking
         setLoginUser(loginUser)
         setLoginToken(loginUserJwt)
        break;
  
    case LOGOUT : 
        const {setUser,setToken} = payload
        // removing data from localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        // removing data from state
        setUser(null)
        setToken(null)
      break;

    default:
        break;
  }
}