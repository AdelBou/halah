import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Button, Thumbnail, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default class BanModel extends React.Component {



    render() {
        return (
            <View>
                <Modal isVisible={this.props.visib} >
                        <Grid style={{ backgroundColor: '#fff',marginLeft:30,marginRight:30,marginTop:100,marginBottom:70,paddingBottom:20}} >
                            <Row size={1}
                                 style={[styles.CotainerStyle, {
                                     backgroundColor: '#fff',
                                     borderBottomColor: '#ccc',
                                     padding: 15
                                 }]}>

                                <Text style={[styles.labelStyle,{color:'#238AC5',fontSize:22}]}>اختر نوع المخالفة </Text>
                                <Icon2 name="user-times" size={100} color="#238AC5"/>
                            </Row>
                            <Row size={2} style={[styles.CotainerStyle, {backgroundColor: '#fff'}]}>
                                <Button block style={styles.buttonStyle} onPress={()=>{this.props.onBan("كلام اباحي او فاحش")}}>
                                            <Text style={styles.labelStyle}>كلام اباحي او فاحش</Text>
                                </Button>
                                <Button block style={styles.buttonStyle} onPress={()=>{this.props.onBan("كلام هجومي او متنمر ")}}>
                                            <Text style={styles.labelStyle}>كلام هجومي او متنمر </Text>
                                </Button>
                                <Button block style={styles.buttonStyle} onPress={()=>{this.props.onBan("تهجم على الأديان وطوائف")}}>
                                            <Text style={styles.labelStyle}>تهجم على الأديان وطوائف </Text>
                                </Button>
                                <Button block style={styles.buttonStyle} onPress={()=>{this.props.onBan("دخول في سياسيه الدول")}}>
                                            <Text style={styles.labelStyle}>دخول في سياسيه الدول </Text>
                                </Button>
                                <Button block style={styles.buttonStyle} onPress={()=>{this.props.onBan("مخالفة اخرى")}}>
                                            <Text style={styles.labelStyle}>مخالفة اخرى </Text>
                                </Button>
                                <View style={{margin: 20, borderColor: '#ccc', borderWidth: 1, alignSelf: 'stretch'}}/>
                                <Button block style={styles.buttonStyle} onPress={this.props.onQuit}>
                                    <Grid>
                                        <Col size={1}>
                                            <Icon name="log-out" size={20} color="#238AC5"/>
                                        </Col>
                                        <Col size={3} style={styles.labelContainer}>
                                            <Text style={[styles.labelStyle,{color:'#000',fontSize:22}]}>الغاء</Text>
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
        color: '#000',
        fontWeight:'blod',
        fontSize: 20
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