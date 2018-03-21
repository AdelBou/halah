import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  INPUT_CHANGED,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MAIL,
  EMPTY_INPUT
} from './types';

export const emailUsUpdate = ({ prop, value }) => {
  return {
    type: INPUT_CHANGED,
    payload: { prop, value }
  };
};


export const sendMessage = ({ userName , message  }) => {

  
  if(message === '')
    {
    return{
         type: EMPTY_INPUT 
    };}

  return (dispatch) => {

    dispatch({ type: SEND_MAIL });

    firebase.database().ref(`/messages`)
    .push({ userName, message })
    .then(messageSuccess(dispatch))
    };
};


const messageSuccess = (dispatch) => {
  dispatch({
    type: SEND_MESSAGE_SUCCESS,
  });
};

const messageFail = (dispatch) => {
    dispatch({
      type: SEND_MESSAGE_FAIL
    });
  };
  
