import React, { Component } from 'react';
import {Label,Input,Button,CheckBox, Header,Thumbnail, Content, Card, CardItem, Text, Body,Spinner } from 'native-base';
import { Image,View ,ImageBackground,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Actions} from 'react-native-router-flux';
class accept extends Component {

    constructor(props) {
super(props);
        this.state = {acc: false};


      }

  render() {

    return (

        <View style={styles.containerStyle}>

          <ScrollView  containerStyle={{ flexDirection: 'column'}}>
                                 <Text>
                                       {policy}
                                 </Text>
                                 <View style={{ flexDirection: 'row',
                                  justifyContent : 'space-around'}}>
                                  <CheckBox checked={this.state.acc}
                                   onPress={()=>this.setState({acc:!this.state.acc})}/>
                                 <Text >
                                       هل توافق على سياسة الخصوصية
                                 </Text>


                                  </View>
             </ScrollView>
             <View style={{flex :1}}/>
             <View style={{flex :1}}>
                <Button block rounded disabled={!this.state.acc}
                style ={{backgroundColor :'#238AC5' }}
                onPress ={()=> {
                            Actions.login();
                            }}>
                    <Icon name="navigation" size={30} color="#fff" />
                    <Text  style={{fontSize : 20}}>موافق</Text>
                </Button>
              </View>

            </View>

    );
  }


}
const policy=
'شرط الاستخدام\n' +
'تطبيق هلا شات مخصص في شات ، خصوصية لها أهمية بالغة بالنسبة لنا. وثيقة سياسة الاستخدام التطبيق هذه تحدد الخطوط بنسه لنا ..\n' +
'١- الدخول المشروع للتطبيق\n' +
'باسم مستخدم او كا مجهول\n' +
'يجب عدم دخول بأسماء مخلل بالآداب العامة والخاصة والاسماء عنصريه ضد دول او كيانات اخري او اسماء طائفيه او اسماء عنصريه\n' +
'٢- عدم نشر حسابات الخاصة\n' +
'يجب التنبيه بعدم اعطاء حسابات التواصل الاجتماعي والارقام الهاتف والتطبيق غير مسؤول في اعطاء الارقام وحسابات الشخصية\n' +
'٣-يمنع نشر الألفاظ البذيئة مخلل الآداب العامة\n' +
'\n' +
'٤- الكرهيه ضد الدول والسياسة\n' +
'يمنع تهجم ضد سياسه الدول الرسمية للدولة ومهاجمه رمزها الوطنية والحديث في مواضيع سياسيه لدول .\n' +
'٥-الابلاغ\n' +
'يجب الابلاغ عن الاشخاص الذين ينشرون حسابات الخاصة في تواصل الاجتماعي والارقام الخاصة .\n' +
'وعدم نشر ومطالبه في متابعه حسابات والتطبيق غير مسؤول في ما يحث خارج نطاق التطبيق .\n' +
'\n' +
'التواصل معنا\n' +
'ا في حال رغبت بإبداء أي تعليق موجه لنا حول تطبيق هلا شات أو في حال رغبت في توجيه أية أسئلة تتعلق بذلك رجاء تفضل بالاتصال بنا من خلال نموذج في تطبيق او علي حسابات التطبيق في مواقع تواصل الاجتماعي .';

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
      backgroundColor:'white',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems : 'stretch',
      padding : 60
    }

};


  export default accept;
