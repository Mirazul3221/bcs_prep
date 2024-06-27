import { decode_token } from "./extract_jwt";
export const dataReducer = (state,action) => {
 //user authentication function
 const {type,paylod} = action;
 if (type == "login_success") {
    state.userInfo = decode_token(paylod.token),
    state.token = paylod.token
 }
 if (type == "logout") {
    state.userInfo = '',
    state.token = ''
    localStorage.removeItem('token')
 }

//============================
 if (type === "ALL") {
   state.questionData = action.payload;
   return state;
 }

 if (type === "FILTER") {
   const allData = action.payload;
   const filterQuestions = allData.filter((quest) => {
     return quest.subject === action.filter;
   });
   return filterQuestions;
 }
 return state
}