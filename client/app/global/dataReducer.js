import { decode_jwt } from "../userdashboard/utils/jwtExtract";
export const dataReducer = (state,action) => {
 //user authentication function
 const {type,paylod} = action;
 if (type == "login_success") {
    state.userInfo = decode_jwt(paylod.token),
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

 if (type === "RECENT") {
   const allData = action.payload;
   const recentData = allData.slice(0, 20);
   state.questionData = recentData;
   return state;
 }


 return state
}