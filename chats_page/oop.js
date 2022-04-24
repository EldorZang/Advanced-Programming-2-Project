import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import message_sent from "./images/sent_message.jpg";
import message_recv from "./images/recv_message.jpg";
import './ChatsPageComponents.css';
import { MessagesInfo, UsersInfo } from './databaseArrs'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'


export class MainPage extends React.Component {
    constructor(props) {
        super(props);
       // console.log(UsersInfo())
       var usersDataBase = new UsersInfo().getData()
       var messagesDataBase = new MessagesInfo().getData()
       console.log(usersDataBase);
        this.state = {
            usersData: usersDataBase,
            messagesData: messagesDataBase,
            loggedUser: "user1",
            textInput: "",
            activeUser: usersDataBase["user1"]["friends"][0]
        };
        this.resolveUserInfo = this.resolveUserInfo.bind(this)
        this.handleMessageInputChange = this.handleMessageInputChange.bind(this)

        
    }
    resolveUserInfo (userName){
        console.log(this.state.messagesData[userName]);
        var lastMessageIndex = this.state.messagesData[userName].length - 1;
        var timeStamp = (this.state.messagesData)[userName][lastMessageIndex].timeStamp;
        var message, picture, nickName;
        if ((this.state.messagesData[userName][lastMessageIndex]).type === "text") {
            message = (this.state.messagesData)[userName][lastMessageIndex].data
        }
        else {
            message = (this.state.messagesData)[userName][lastMessageIndex].type
        }
        picture = (this.state.usersData[userName]).profile
        nickName = (this.state.usersData[userName]).nickName
        return ({
            "timeStamp": timeStamp,
            "message": message,
            "picture": picture,
            "nickName": nickName,
            "userName": userName
        });
    }

    handleMessageInputChange (e){
        e.preventDefault();
        this.setState({
            usersData: this.state.UsersInfo,
            messagesData: this.state.MessagesInfo,
            loggedUser: this.state.loggedUser,
            textInput: e.target.value,
            activeUser: this.state.activeUser
        });
    }
    setActiveUser = (e)=>{
        console.log("before")
        console.log(this.state.usersData)
        this.setState({
        usersData: this.state.UsersInfo,
        messagesData: this.state.MessagesInfo,
        loggedUser: this.state.loggedUser,
        textInput: this.state.textInput,
        activeUser: e
    });
    console.log("after")
    console.log(this.state.usersData)}


    render() {
        var chatUsersSideBarInfo = [];
        console.log("???");
        console.log(this.state.usersData);
        console.log("!!!");
        console.log(this.state.loggedUser);
        console.log("!!!");
        ((this.state.usersData[this.state.loggedUser])["friends"]).map((user) => {
            chatUsersSideBarInfo = [...chatUsersSideBarInfo, this.resolveUserInfo(user, this.state.usersData, this.state.messagesData)]
        })

        return (<Container >
            <Row className="row g-0">
                <Col ><ChatsNavigation data={
                    {
                        "usersInfo": chatUsersSideBarInfo,
                        "usersData": this.state.usersData,
                        "messagesData": this.state.messagesData,
                        "setActiveUser": this.setActiveUser,
                        "activeUser": this.state.activeUser,
                        "loggedUser": this.state.loggedUser
                    }} /></Col>
            </Row>
        </Container>)
    }
}
export class ChatsNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: props.data.activeUser,
            setActiveUser: props.data.setActiveUser,
            usersInfo: props.data.usersInfo,
            messagesData: props.data.messagesData
        }
    }
    handleOnSelect= (e)=> {
        this.state.setActiveUser(e);
    }
    render() {

        return (
            <Tab.Container id="left-tabs-example"
                activeKey={this.state.activeUser}
                onSelect={this.handleOnSelect}
                defaultActiveKey={this.state.activeUser}>
                <Row>
                    <Col>
                        <Nav variant="pills" className="flex-column">
                            {this.state.usersInfo.map((chatsInfosData, index) => {
                                return (
                                    <Nav.Item key={index}>
                                        <Nav.Link eventKey={chatsInfosData.userName}>
                                            <ChatInfo data={chatsInfosData} />
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content>
                            {this.state.usersInfo.map((chatsInfosData, index) => {
                                return (
                                    <Tab.Pane key={index} eventKey={chatsInfosData.userName}>
                                        <MessageWindow data={(this.state.messagesData)[chatsInfosData.userName]} />
                                    </Tab.Pane>);
                            })}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        )
    }
}
export class ChatInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastMessage: props.data.message,
            nickName: props.data.nickName,
            timeStamp: props.data.timeStamp,
            picture: props.data.picture
        }
    }
    render() {
        return (
            <Container fluid='true'>
                <Row>
                    <Col ><img src={`${process.env.PUBLIC_URL}/${this.state.picture}`} alt="profile2" width="100" height="100" /></Col>
                    <Col>{this.state.nickName}<br />{this.state.message}</Col>
                    <Col >{this.state.timeStamp}</Col>
                </Row>
            </Container>
        )
    }
}
export class MessageWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.data
        }
    }
    render() {
        return (
            <Container fluid='true'>
                {this.state.messages.map((messageData, index) => {
                    return (
                        <Row key={index}>
                            <Message data={messageData.data} recieved={messageData.recieved} />
                        </Row>
                    );
                })}
            </Container>
        )
    }
}
export class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recieved: props.recieved,
            data: props.data
        }
    }
    render() {
        let image;
        if (this.state.recieved) {
            image = message_recv;
        }
        else {
            image = message_sent;
        }
        return (
            <div className="message_image" >
                <p className="message_text">{this.state.data}</p>
                <img src={image} alt="Info" width="200" height="50" />
            </div>

        )
    }
}