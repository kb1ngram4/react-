import { 
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS
 } from "../action-types/category";
const initCategory = []
function category(prevState = initCategory,action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      
      return action.data;
    case ADD_CATEGORY_SUCCESS:
      return [...prevState,action.data]
    default:
      return prevState;
  }
}
export default category;