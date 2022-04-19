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
import profile from "./images/profile_1.jpg";
import message_sent from "./images/sent_message.jpg";
import message_recv from "./images/recv_message.jpg";
import './ChatsPageComponents.css';
import { MessagesInfo, UsersInfo } from './databaseArrs'
function ResolveUserInfo(userName, users, userMessages) {

    let timeStamp = (userMessages[userMessages.length - 1]).timeStamp;

    let message, picture,nickname;
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
        "nickname": nickname
    });
}
export function Main_Page() {
    const [users, setusers] = useState(UsersInfo);
    const [userMessages, setuserMessages] = useState(MessagesInfo);
    let usersInfo = [];
    Object.keys(users).map((user) => {
        usersInfo = [...usersInfo,ResolveUserInfo(user, users[user], userMessages[user])]
    })
    return (
        <Container >
            <Row class="row g-0">
                {    console.log(usersInfo)}
                <Col ><SideBar props={usersInfo}/></Col>
                <Col><MessageWindow messages={userMessages["user1"]} /></Col>
            </Row>
        </Container>
    )
}
export function MessageWindow(props) {
    const [messages, setMessages] = useState(props.messages);
    console.log("log2");
    console.log(messages);

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
export function ChatInfo(props) {
    console.log("54:");
    console.log(props);
    const [info, setInfo] = useState(props.data);
    console.log("30:")
    console.log(info);
    return (
        <Container fluid='true'>
            <Row>
                {console.log(info.picture)}
                <Col ><img src={info.picture} alt="profile" width="100" height="100" /></Col>
                <Col>{info.nickname}<br />{info.message}</Col>
                <Col >{info.timeStamp}</Col>
            </Row>
        </Container>
    )
}
export function SideBar(props) {
    console.log("23:")
    console.log(props)
    const [chatsInfos, setChatsInfos] = useState(props.props);
    console.log("25:")

    console.log(chatsInfos)
    return (
        <ButtonGroup vertical>
            {chatsInfos.map((chatsInfosData) => {
                console.log("24:")
                console.log(chatsInfosData)
                return (
                    <Button>
                        <ChatInfo data={chatsInfosData} />
                    </Button>
                );
            })}
        </ButtonGroup>
    )
}