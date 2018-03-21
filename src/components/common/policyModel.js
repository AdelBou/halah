import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Button, Thumbnail, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';


export default class PolicyModel extends React.Component {



    render() {
        return (
            <View>
                <Modal isVisible={this.props.visib} >
                        <Grid style={{ backgroundColor: '#fff',marginLeft:10,marginRight:10,marginTop:50,marginBottom:40,padding:20}} >
                            <Row size={1}
                                 style={[styles.CotainerStyle, {
                                     backgroundColor: '#fff',
                                     borderBottomColor: '#ccc',
                                     padding: 15
                                 }]}>
                                <Icon name="lock" size={40} color="#238AC5"/>
                            </Row>
                            <Row size={3}>
                            <ScrollView containerStyle={styles.CotainerStyle}>
                                <Text style={styles.labelStyle}>
                                    {policy}
                                </Text>
                            </ScrollView>
                            </Row>   
                            <Row size={1} style={[styles.CotainerStyle, {backgroundColor: '#fff'}]}> 
                                <View style={{margin: 20, borderColor: '#ccc', borderWidth: 1, alignSelf: 'stretch'}}/>
                                <Button block style={styles.buttonStyle} onPress={this.props.onQuit}>
                                    <Grid>
                                        <Col size={1}>
                                            <Icon name="log-out" size={20} color="#238AC5"/>
                                        </Col>
                                        <Col size={3} style={styles.labelContainer}>
                                            <Text style={styles.labelStyle}>خروج</Text>
                                        </Col>
                                    </Grid>
                                </Button>
                            </Row>
                        </Grid>
                </Modal>
            </View>

        )
    }
}


const styles = {
    CotainerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    labelContainer: {
        justifyContent: 'flex-end'
    },
    labelStyle: {
        color: '#999',
        fontSize: 15
    },
    buttonStyle: {
        elevation: 0,
        paddingLeft: 20,
        paddingRight: 20,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'

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