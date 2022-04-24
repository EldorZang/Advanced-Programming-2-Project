import React, { useState, useMemo, useContext, createContext, useEffect } from 'react';
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


export const UsersContext = createContext(UsersInfo);
export const MessagesContext = createContext(MessagesInfo);
export const ContactsContext = createContext("");
export const ActiveUserContext = createContext("user2");
export const LoggedUserContext = createContext("user1");



export function MainPage() {


    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const handleMessageInputChange = (e) => {
        e.preventDefault();
        // setTextInput(e.target.value);
    };

    console.log(usersData);
    console.log("!!!");
    console.log(loggedUser);
    console.log("!!!");


    return (

        <Container >
            <Row className="row g-0">
                    <Col ><ChatsNavigation /></Col>
            </Row>
        </Container>


    )
}
export function ChatsNavigation(props) {
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    console.log("talala");
    console.log(contacts);

    var handleOnSelect = (e) => {
        setActiveUser(e);
    }
    return (
        <Tab.Container id="left-tabs-example"
            activeKey={activeUser}
            onSelect={handleOnSelect}
            defaultActiveKey={activeUser}>
            <Row>
                <Col>
                    <Nav variant="pills" className="flex-column">
                    {console.log("12345")}
                        {console.log(contacts)}
                        {contacts.map((chatsInfosData, index) => {
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
                        {contacts.map((chatsInfosData, index) => {
                            return (
                                <Tab.Pane key={index} eventKey={chatsInfosData.userName}>
                                    <MessageWindow data={messagesData[chatsInfosData.userName]} />
                                </Tab.Pane>);
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    )
}
export function ChatInfo(props) {
    var info = props.data;
    return (
        <Container fluid='true'>
            <Row>
                <Col ><img src={`${process.env.PUBLIC_URL}/${info.picture}`} alt="profile2" width="100" height="100" /></Col>
                <Col>{info.nickName}<br />{info.message}</Col>
                <Col >{info.timeStamp}</Col>
            </Row>
        </Container>
    )
}
export function MessageWindow(props) {
    var messages = props.data;
    return (
        <Container fluid='true'>
            {messages.map((messageData, index) => {
                return (
                    <Row key={index}>
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
export function Main() {
      const ResolveUserInfo = (userName)=> {
        console.log(messagesData);
        var recentMsgId = messagesData[userName].length - 1;
        var timeStamp = (messagesData[userName][recentMsgId]).timeStamp;
        var recentMessage, picture, nickName;
        if ((messagesData[userName][recentMsgId]).type === "text") {
            recentMessage = messagesData[userName][recentMsgId].data
        }
        else {
            recentMessage = messagesData[userName][recentMsgId].type
        }
        picture = usersData[userName].profile
        nickName = usersData[userName].nickName
        return ({
            "timeStamp": timeStamp,
            "message": recentMessage,
            "picture": picture,
            "nickName": nickName,
            "userName": userName
        });
    }
    const [usersData, setUsersData] = useState(UsersInfo);
    const [messagesData, setMessagesData] = useState(MessagesInfo);
    const [activeUser, setActiveUser] = useState("user2");
    const [loggedUser, setLoggedUser] = useState("user1");
    console.log(messagesData);
    var chatUsersSideBarInfo = [];
    ((usersData[loggedUser])["friends"]).map((user) => {
        console.log("444");

        console.log(messagesData);
        chatUsersSideBarInfo = [...chatUsersSideBarInfo, ResolveUserInfo(user)]
    })
        console.log("insideuseeffect");
        console.log(chatUsersSideBarInfo);
    const [contacts, setContacts] = useState(chatUsersSideBarInfo);



    return (<UsersContext.Provider value={{ usersData, setUsersData }}>
        <MessagesContext.Provider value={{ messagesData, setMessagesData }}>
            <ContactsContext.Provider value={{ contacts, setContacts }}>
                <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
                    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
                        <MainPage />
                    </LoggedUserContext.Provider>
                </ActiveUserContext.Provider>
            </ContactsContext.Provider>
        </MessagesContext.Provider>
    </UsersContext.Provider>)
}