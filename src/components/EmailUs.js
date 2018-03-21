import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailUsUpdate , sendMessage} from '../actions';
import {Form,Item,Label,Input,Button, Container, Header,Thumbnail, Content, Card, CardItem, Text, Body,Spinner } from 'native-base';
import { Image,View ,ImageBackground} from 'react-native';
import {Sae,Madoka} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Feather';


class EmailUs extends Component {


    onUserChange(value) {
        this.props.emailUsUpdate({ prop: 'userName', value });
        
      }
    onMessageChange(value) {
        this.props.emailUsUpdate({ prop: 'message', value });    
      }


  render() {

    return ( 

   
        <ImageBackground source={require('../../assets/back3.png')} style={styles.containerStyle}>
           <View style={{flex :2 , backgroundColor :'#fff'}}>
                           <Sae  
                                    label ="الاميل"
                                    iconClass={Icon}
                                    iconName={'at-sign'}
                                    iconColor='#238AC5'
                                    labelStyle={{color : '#555'}}
                                    inputStyle={{color:'#555'}}
                                    onChangeText={this.onUserChange.bind(this)}
                                    value={this.props.userName}/> 
          </View> 
          <View style={{flex :3, flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems : 'stretch'}}>               
                            <Madoka  
                                    inputHeight={{height:500}} 
                                    label ="اكتب رسالة بناءة..."
                                    borderColor='#238AC5'
                                    labelStyle={{color : '#555'}}
                                    multiline={true}
                                    inputStyle={{color:'#555' ,backgroundColor:'#fff'}}
                                    onChangeText={this.onMessageChange.bind(this)}
                                    value={this.props.message}/>

                                    <Text style={styles.errorTextStyle}>
                                           {this.props.error}
                                    </Text>
                                    <Text style={styles.successTextStyle}>
                                            {this.props.success}
                                    </Text>
                           
            </View>
             <View style={{flex :2}}/> 
             <View style={{flex :1}}> 
                {this.renderButton()} 
              </View> 
              
            </ImageBackground>               

    );
  }
  renderButton()
  {
    if (this.props.loading) 
    {
        return <Spinner size="large" color='#238AC5'/>;
    }
    return(
      <Button block 
            style ={{backgroundColor :'#238AC5' , borderRadius: 30 }} 
            onPress ={()=> {
                            const { userName , message } = this.props;
                            this.props.sendMessage({ userName , message });
                        }}>
                <Icon name="navigation" size={30} color="#fff" />
                <Text  style={{fontSize : 20}}>ارسل</Text>
     </Button>);
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  },
  inputStyle : {
   fontSize:20,
   color :'red',
   alignSelf :'center'   
  },
   containerStyle : { 
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems : 'stretch',
      padding : 20
    }
  
};

const mapStateToProps = ({ emailUs }) => {

    const { userName,message, loading ,error,success} = emailUs;
    return { userName,message ,loading , error,success};
  };
  
  export default connect(mapStateToProps, {
    emailUsUpdate ,sendMessage
  })(EmailUs);
  


