import {
    INPUT_CHANGED,
    EMPTY_INPUT,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
   SEND_MAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    userName: '',
    message: '',
    loading : false,
    error: '',
    success:''
  };
  
  export default (state = INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type) 
    {
      case INPUT_CHANGED:
       return { ...state, [action.payload.prop]: action.payload.value ,error :'' };
      case SEND_MAIL:
        return {  ...state, loading: true };

      case SEND_MESSAGE_SUCCESS:
        return  {  ...state, success :'تم ارسال الرسالة بنجاح' ,error:'',loading :false };

      case SEND_MESSAGE_FAIL:
        return  {  ...state, error :'يرجى اعادة المحاولة',success :'' ,loading:false };

      case EMPTY_INPUT:
        return  {  ...state, error :'الرسالة فارغة',success :'' ,loading:false };

      default:
        return state;
    }
  };
  