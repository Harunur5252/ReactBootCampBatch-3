import { DELETE_CONTACT,ADD_CONTACT,UPDATE_CONTACT, LOAD_CONTACTS } from "./contactType";
// import { v4 as uuidv4 } from 'uuid';

const contactsReducer = (state,action) => {
    // state means initialContacts
    // state means {type:'DELETE_CONTACT',payload : id}
    const {type,payload} = action

    switch (type) {
      case LOAD_CONTACTS :
        return [...payload]
        
      case DELETE_CONTACT:
        const updatedContacts = state.filter(contact => contact.id !== payload)
        return [...updatedContacts]

      case ADD_CONTACT:
        const newContact = {
          ...payload
        }
        return [newContact,...state]

      case UPDATE_CONTACT:
        const {id,contact : contactToUpdate} = payload
        const contacts =  state.map(contact => {
          if(contact.id === id){
             return {
              id,
              ...contactToUpdate
             }
          }else{
             return contact
          }
      })
        return [...contacts]

      default:
        return state
    }
}
export default contactsReducer