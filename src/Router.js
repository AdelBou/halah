import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Chat from './components/chat';
import EmailUs from './components/EmailUs';
import accept from './components/accept';
import {Platform} from 'react-native';

const RouterComponent = () => {
    let style =null;
   if (Platform.OS === 'android') {
        style= {backgroundColor:'#238AC5'}
    }
  return (
          <Router  navigationBarStyle={{ backgroundColor: '#238AC5' }}  titleStyle={{color :'#fff'}} sceneStyle={style}>
            <Scene key="root" >
                  <Scene tabBarStyle={styles.tabBarStyle} key="login"  component={LoginForm} hideNavBar  />
                  <Scene tabBarStyle={styles.tabBarStyle} key="accept" initial component={accept} hideNavBar  />
                  <Scene tabBarStyle={styles.tabBarStyle} key="emailUs" title="راسلنا" component={EmailUs} />
                  <Scene tabBarStyle={styles.tabBarStyle} key="chat"  hideNavBar component={Chat} />
            </Scene >
          </Router>
  );
};

const  styles={
tabBarStyle: {

        backgroundColor: '#eeeeee',
        indicatorStyle : {
            color: '#238AC5'
        },
    }
}

export default RouterComponent;