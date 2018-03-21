import React, {Component} from 'react';
import {connect} from 'react-redux';
import Iconwassim from 'react-native-vector-icons/Feather';
import Iconadel from 'react-native-vector-icons/FontAwesome';
import BanModel from './common/banModel';
import PolicyModel from './common/policyModel';
import {
    View, AppState, Platform,
    Text, Image, Keyboard,
    StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ImageBackground,
} from 'react-native';


import {
    Fab,
    Spinner,
    Button,
    Body,
    Icon,
    Col,
    Title,
    Container,
    Content,
    Header,
    Left,
    Right,
    Grid,
    Row,
    Drawer
} from 'native-base';

import {SideDrawer} from './common';
import {GiftedChat, Send, Bubble, Composer, InputToolbar, Day} from 'react-native-gifted-chat';
import MyIcon from './myIcon';
import firebase from 'firebase';
import Emoji from './emoji';
import * as actions from '../actions';
import {Notifications} from 'expo';

require('moment/locale/ar');
import {
    AdMobBanner,
    AdMobInterstitial,
    AdMobRewarded,
} from 'react-native-admob'

AdMobInterstitial.setAdUnitId('ca-app-pub-8219247197168750/1723469774');

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isModalVisible: false,
            isPolicyVisible: false,
            messages: [],
            user: this.props.user,
            text: '',
            emojiShow: false,
            active: false,
            loading: false,
            serchingFor: true,
            start: false,
            visible: true,
            chatting: false,
            friend: this.props.friend,
            notif: '',
            appState: AppState.currentState,
            position:0,

        };

        this.props.set_user(this.props.userName);
        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order');
        this.onSend = this.onSend.bind(this);

        this.onPressButtonEmoji = this.onPressButtonEmoji.bind(this);
        this._localNotification = this._localNotification.bind(this);
    }


    async _localNotification() {
        const notification = {
            title: 'رسالة جديدة من طرف :' + this.props.friend.name,
            body: this.state.notif,
            data: '',
            ios: {
                sound: true
            },
            android: {
                sound: true
            }
        }

        const scheduleOptions = {
            time: Date.now() + 1000
        }

        Notifications.scheduleLocalNotificationAsync(
            notification,
            scheduleOptions
        )
    }

    _toggleModal = () => {
        if (this.props.chatting === true)
            this.setState({isModalVisible: !this.state.isModalVisible})

    };
    _togglePolicy = () => {
        this.setState({isPolicyVisible: !this.state.isPolicyVisible})

    };

    generateChatId(friend) {
        if (friend)
            if (this.props.thisUser.id > friend.id)
                return `${this.props.thisUser.id}-${friend.id}`;
            else
                return `${friend.id}-${this.props.thisUser.id}`;
        else return '--';
    }

    getRef() {
        return firebase.database().ref();
    }

    showInterstitial = () => {
        AdMobInterstitial.showAd();
    }

    listenForItems(chatRef) {
        chatRef.on('value', (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = 'https://www.gravatar.com/avatar/'
                // var name = child.val().uid == this.user.id ? this.user.name: this.friend.name
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid,
                        avatar: avatar
                    }
                });

                if ((child.val().uid === this.props.friend.id) && AppState.currentState === 'background') {
                    this.setState({notif: child.val().text})
                    this._localNotification();
                }
            });

            this.setState({
                loading: false,
                messages: items
            })


        });
    }

    componentDidMount() {
        //this.listenForItems(this.chatRefData);
        //this.serchForFriend();
        // AdMobInterstitial.setTestDevices(['ca-app-pub-8219247197168750~3344811272']);


        AdMobInterstitial.addEventListener('interstitialDidLoad',
            () => console.log('AdMobInterstitial adLoaded')
        );
        AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
            (error) => console.warn(error)
        );
        AdMobInterstitial.addEventListener('interstitialDidOpen',
            () => console.log('AdMobInterstitial => adOpened')
        );
        AdMobInterstitial.requestAd();
    }


    componentWillMount() {

        this.setState({friend: this.props.friend});

        //add22
       // if (Platform.OS === 'ios' ) {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
                this._keyboardDidShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
                this._keyboardDidHide);
      //  }
    }

    _keyboardDidShow = (e) => {
        let keyboardHeight = e.endCoordinates.height;
        this.setState({
            position:300,
            minInputToolbarHeight: keyboardHeight + 45,
        });
        console.log("did show")
    }

    _keyboardDidHide = () => {
        this.setState({
             position:0,
            minInputToolbarHeight: 45,
        });
         console.log("did go")
    }


    componentWillReceiveProps(nextProps) {
        this.chatRefData.off();
        this.chatRef = this.getRef().child('chat/' + this.generateChatId(nextProps.friend));
        this.chatRefData = this.chatRef.orderByChild('order');
        this.listenForItems(this.chatRefData);
    }

    componentWillUnmount() {
        this.props.set_user(this.props.userName);
        this.chatRefData.off();
        //wassim
        this.props.unmount();
        // firebase.auth().signOut();

        if (Platform.OS === 'ios') {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
    }

    onPressButtonEmoji = () => {
        this.setState({
            emojiShow: !this.state.emojiShow
        })
    };

    onSend(messages = []) {

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });

        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.props.thisUser.id,
                order: -1 * now
            })
        })

    }


    renderEmoji = () => {
        return (
            <TouchableOpacity style={[styles.containerShadow, {
                width: 45,
                height: 300,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }]}
                              onPress={this.onPressButtonEmoji}
            >
                <Iconadel name="smile-o" size={30} color="#238AC5"/>

            </TouchableOpacity>

        );
    }

    onPressEmoji = (emoji) => {
        // let adel=this.state.messages[1].text ;


        this.setState({
                text: this.state.text + emoji
            }
        )
    };


    getEmoji() {
        if (this.state.emojiShow) {
            return (<View style={[styles.containerShadow, {
                paddingRight: 7,
                paddingLeft: 5,
                flex: 1,
                backgroundColor: '#FFF',
                marginBottom: 5
            }]}><Emoji
                OnPressEmoji={(emoji) => this.onPressEmoji(emoji)}/></View>);
        }
        else return null;

    }


    renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={[styles.containerShadow, {
                    width: 40,
                    maxWidth: 40,
                    height: 35,
                    maxHeight: 45,
                    padding: 0,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>

                <Iconwassim name="navigation" size={30} color="#238AC5"/>

            </Send>
        );
    }

    report = (x) => {
        let theBan = {
            id: this.props.friend.id,
            reports: 0,
            banned: false,
            type: [],
        };
        firebase.database().ref(`/reports/${theBan.id}`).once(
            'value', snapshot => {
                if (snapshot.val() !== null) {
                    theBan = snapshot.val();
                }
                theBan.reports++;
                theBan.banned = (theBan.reports > 10);
                theBan.type.push(x);
                firebase.database().ref(`/reports/${theBan.id}`).set(theBan);
            }
        );
        alert(" تم اسال التبليغ  " + x);
        this._toggleModal();
    };

    renderBubble(props) {
        return ( <Bubble {...props}
                         wrapperStyle={{
                             left: {
                                 backgroundColor: '#CFD8DC',
                             },
                             right: {
                                 backgroundColor: '#238AC5'
                             }
                         }}/>);
    }

    renderComposer(props) {
        return (
            <View style={[styles.containerShadow, {backgroundColor: '#EEEEEE'}]}>
                <Composer {...props} placeholder={'رسالة جديدة'}
                          textInputStyle={{alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, marginRight: 0}}
                />
            </View>);
    }


    renderInputToolbar(props) {
        return (

            <InputToolbar {...props}
                          containerStyle={[{
                              flex: 1,
                              backgroundColor: '#FFF',
                              borderColor: '#000',
                              borderWidth: 1,
                              borderTopColor: 'transparent',

                          }]}
                          primaryStyle={[, styles.containerShadow, {
                              flex: 1,
                              paddingBottom: 10,
                              borderWidth: 0, backgroundColor: 'transparent',
                              justifyContent: 'center',
                              alignItems: 'center'
                          }]}/>
        );
    }

    renderDay(props) {
        return (
            <Day {...props}
                 textStyle={{color: '#FFF'}}
            />
        );
    }

    serchForFriend = () => {

        this.props.set_user(this.props.userName);
        this.props.search_friend(this.props.thisUser);
        AdMobInterstitial.requestAd();
        this.showInterstitial();

    };


    logOut = () => {
        this.props.set_user(this.props.userName);
        this.chatRef.remove();

    };
    getTheChat = () => {
        if (this.props.chatting && !this.props.loading) {
            return (
                <View style={{flex: 1,marginBottom:this.state.position}} >
                    <GiftedChat
                        messages={this.state.messages}
                        renderSend={this.renderSend}
                        onSend={(messages) => this.onSend(messages)}
                        renderAccessory={this.renderEmoji}
                        renderComposer={this.renderComposer.bind(this)}
                        renderAvatar={null}
                        renderInputToolbar={this.renderInputToolbar.bind(this)}
                        text={this.state.text}
                        renderBubble={this.renderBubble.bind(this)}
                        renderDay={this.renderDay.bind(this)}
                        locale={'ar'}
                        user={{
                            _id: this.props.thisUser.id,
                            avatar:null
                        }}
                        onInputTextChanged={(txt) => this.setState({text: txt})}
                    />

                    {this.getEmoji()}
                </View>
            );
        }
        else if (!this.state.start) {
            return (

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    <TouchableOpacity onPress={this.start}>
                        <Text style={{color: '#238AC5', fontSize: 25}}>ابدا البحث عشوائي</Text>
                    </TouchableOpacity>
                </View>
            );

        }
        else return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#238AC5', fontSize: 25}}>{this.props.error}</Text>
                    {this.getSpinner(this.props.loading)}
                </View>
            );
    }
    start = () => {
        this.setState({
            start: true
        })
        this.serchForFriend();
    }


    getSpinner(x) {
        if (x) return <Spinner size="large" color='#238AC5'/>;
    }


    getTheMainView = () => {
        if (this.state.loading) return (
            <ImageBackground source={require('../../assets/back3.png')} style={{flex: 1}}> <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Spinner
                color='#238AC5'/></View></ImageBackground>);
        else return (
            <ImageBackground source={require('../../assets/back3.png')} style={{flex: 1}}>
                <AdMobBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-8219247197168750/7575221395"
                />

                {this.getTheChat()}
            </ImageBackground>
        );

    }


    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    _search = () => {
        this.props.search_friend(this.props.thisUser)
        this.closeDrawer();
    }

    render() {
        return (
            <Drawer side={'left'}
                    ref={(ref) => {
                        this.drawer = ref;
                    }}
                    content={<SideDrawer navigator={this.navigator}
                                         onQuit={this._togglePolicy}
                                         username={this.props.thisUser.name}
                                         search={this._search}
                                         open={this.openDrawer}
                                         close={this.closeDrawer}/>}
                    onClose={() => this.closeDrawer()}>
                <Container style={{paddingTop: 18}}>
                    <Header style={{backgroundColor: '#238AC5'}} androidStatusBarColor="#238AC5">
                        <Grid>
                            <Col size={1}>
                                <TouchableOpacity onPress={this.openDrawer}
                                                  style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                    <Iconwassim name="align-justify" size={22} color="#FFF"/>
                                </TouchableOpacity>
                            </Col>
                            <Col size={3}>
                                <TouchableOpacity onPress={this.logOut}
                                                  style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>

                                    <Text style={[{fontSize: 22, color: '#FFF'}]}>
                                        {this.props.friend.name ? this.props.friend.name : ''}
                                    </Text>
                                </TouchableOpacity>
                            </Col>

                            <Col size={1}>
                                <TouchableOpacity onPress={() => this._toggleModal()}
                                                  style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                    <Iconadel name="ban" size={22} color="#FFF"/>
                                </TouchableOpacity>
                            </Col>
                            <Col size={1}>
                                <TouchableOpacity onPress={this.serchForFriend}
                                                  style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                                    <Iconadel name="share" size={22} color="#FFF"/>

                                </TouchableOpacity>
                            </Col>

                        </Grid>

                    </Header>
                    {this.getTheMainView()}
                    <BanModel visib={this.state.isModalVisible} onQuit={this._toggleModal} onBan={this.report}/>
                    <PolicyModel visib={this.state.isPolicyVisible} onQuit={this._togglePolicy}/>

                </Container>
            </Drawer>

        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10,

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    containerShadow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
});

const mapStateToProps = ({chat}) => {
    /*
    return { messages:chat.messages,
        friend:chat.friend,
        searchingForFriend:chat.searchingForFriend,
        connected:chat.connected,
        chatting:chat.chatting,
        error:chat.error,
        user:chat.thisUser
    };*/
    const {thisUser, messages, chatting, friend, error, loading} = chat;
    return {
        thisUser, messages, chatting, friend, error, loading
    }
};

export default connect(mapStateToProps, actions)(Chat);
