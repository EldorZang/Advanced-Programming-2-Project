import React, { useEffect, useState } from 'react';
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
function ResolveUserInfo(userName, users, userMessages) {
    let timeStamp = (userMessages[userMessages.length - 1]).timeStamp;
    let message, picture, nickname;
    if ((userMessages[userMessages.length - 1]).type === "text") {
        message = userMessages[userMessages.length - 1].data
    }
    else {
        message = userMessages[userMessages.length - 1].type
    }
    picture = users.profile
    nickname = users.nickname
    return ({
        "timeStamp": timeStamp,
        "message": message,
        "picture": picture,
        "nickname": nickname,
        "username": userName
    });
}
export function Main_Page() {
    const [users, setusers] = useState(UsersInfo);
    const [userMessages, setuserMessages] = useState(MessagesInfo);
    let usersInfo = [];
    Object.keys(users).map((user) => {
        usersInfo = [...usersInfo, ResolveUserInfo(user, users[user], userMessages[user])]
    })
    return (
        <Container >
            <Row class="row g-0">
                <Col ><ChatsNavigation data={
                    {
                        "usersInfo": usersInfo,
                        "users": users,
                        "userMessages": userMessages
                    }} /></Col>
            </Row>
        </Container>
    )
}
export function MessageWindow(props) {
    const [messages, setMessages] = useState(props.data);
    return (
        <Container fluid='true'>
            {messages.map((messageData) => {
                return (
                    <Row>
                        <Message data={messageData.data} recieved={messageData.recieved} />
                    </Row>
                );
            })}
        </Container>
    )
}
export function Message(props) {
    let image;
    if (props.recieved) {
        image = message_recv;
    }
    else {
        image = message_sent;
    }
    return (
        <div className="message_image" >
            <p className="message_text">{props.data}</p>
            <img src={image} alt="Info" width="200" height="50" />
        </div>

    )
}
function get_path(str) {
    return str.data;
}
export function ChatInfo(props) {
    const [info, setInfo] = useState(props.data);
    return (
        <Container fluid='true'>
            <Row>

                <Col ><img src={`${process.env.PUBLIC_URL}/${info.picture}`} alt="profile2" width="100" height="100" /></Col>
                <Col>{info.nickname}<br />{info.message}</Col>
                <Col >{info.timeStamp}</Col>
            </Row>
        </Container>
    )
}
export function ChatsNavigation(props) {
    const [chatsInfos, setChatsInfos] = useState(props.data.usersInfo);
    const [users, setusers] = useState(props.data.users);
    const [userMessages, setuserMessages] = useState(props.data.userMessages);
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col>
                    <Nav variant="pills" className="flex-column">
                        {chatsInfos.map((chatsInfosData) => {
                            return (
                                <Nav.Item>
                                    <Nav.Link eventKey={chatsInfosData.username}>
                                        <ChatInfo data={chatsInfosData} />
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        {chatsInfos.map((chatsInfosData) => {
                            return (
                                <Tab.Pane eventKey={chatsInfosData.username}>
                                    <MessageWindow data={userMessages[chatsInfosData.username]} />
                                </Tab.Pane>);
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}