import React from 'react';
import { View,Linking,Modal} from 'react-native';
import { Col, Row, Grid  } from 'react-native-easy-grid';
import { Button ,Thumbnail,Container,Content } from 'native-base';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import {PolicyModel} from '../common';

const SideDrawer = (props) => {
    

  return (

    <Grid >
            <Row size={1} style={[styles.CotainerStyle,{ backgroundColor: '#fff' ,borderBottomColor :'#ccc'}]}>
                             <Thumbnail 
                                   source={require('../../../assets/icon.png')}
                                   style={{width: 150, height: 150}}/>
                              <Text style={{fontSize: 20}}>{props.username}</Text>
                        
            </Row>
           

            

            <Row  size={2} style={[styles.CotainerStyle,{ backgroundColor: '#fff' }]}>
                
            <Button block style={styles.buttonStyle}
            onPress={props.search}>
                <Grid >
                    <Col size={1}>
                        <Icon name="search" size={20} color="#238AC5"/>
                    </Col> 
                    <Col size={3} style={styles.labelContainer}>
                        <Text style={styles.labelStyle}>ابحث عن مراسل</Text>
                    </Col>
                </Grid >
             </Button>

             <View style={{margin : 20,borderColor:'#ccc', borderWidth: 1 , alignSelf:'stretch'}}/>
            
             <Button block style={styles.buttonStyle}
             onPress={() => {
                               //todo follow us on twitter
                               Linking.openURL('https://twitter.com/Hala_chat');
                            }}>
                <Grid >
                    <Col size={1}>
                        <Icon name="twitter" size={20} color="#238AC5"/>
                    </Col> 
                    <Col size={3} style={styles.labelContainer}>
                        <Text style={styles.labelStyle}>تابعنا على تويتر</Text>
                    </Col>
                </Grid >
             </Button>
             <Button block style={styles.buttonStyle}
             onPress={() => {
                               //todo follow us on instagram
                               Linking.openURL('https://www.instagram.com/hala.chat');
                            }}>
                <Grid >
                    <Col size={1}>
                        <Icon name="instagram" size={20} color="#238AC5"/>
                    </Col> 
                    <Col size={3} style={styles.labelContainer}>
                        <Text style={styles.labelStyle}>تابعنا على انستاغرام</Text>
                    </Col>
                </Grid >
             </Button>
             <Button block style={styles.buttonStyle}
             onPress={props.onQuit}>
                <Grid >
                    <Col size={1}>
                        <Icon name="book" size={20} color="#238AC5"/>
                    </Col> 
                    <Col size={3} style={styles.labelContainer}>
                        <Text style={styles.labelStyle}>شرط الاستخدام</Text>
                    </Col>
                </Grid >
             </Button>
             <View style={{margin : 20,borderColor:'#ccc', borderWidth: 1 , alignSelf:'stretch'}}/>
             <Button block style={styles.buttonStyle}
             onPress={() => {
                               firebase.auth().signOut().then(() =>
                                 {
                                     Actions.login();
                                });    
                            }}>
                <Grid >
                    <Col size={1}>
                        <Icon name="log-out" size={20} color="#238AC5"/>
                    </Col> 
                    <Col size={3} style={styles.labelContainer}>
                        <Text style={styles.labelStyle}>خروج</Text>
                    </Col>
                </Grid >
             </Button>
             
            </Row>
          </Grid>
  );
};

const styles = {
    CotainerStyle : {       
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        paddingTop : 40
    },
    labelContainer :{
        justifyContent: 'flex-end'
    },
    labelStyle:{
        color : '#999',
        fontSize : 20
    },
    buttonStyle :{
        elevation: 0,
        borderWidth:0,
        borderColor:'#FFF',
        shadowColor:'#FFF',
        shadowOpacity:0,
        paddingLeft : 20 ,
        paddingRight : 20 ,
        backgroundColor : 'transparent'

    }
}

export { SideDrawer };
