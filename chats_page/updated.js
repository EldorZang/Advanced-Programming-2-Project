import React, { useState, useMemo, useContext, createContext, useEffect,useReducer } from 'react';
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
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'


export const UsersContext = createContext(UsersInfo);
export const MessagesContext = createContext(MessagesInfo);
export const ContactsContext = createContext("");
export const ActiveUserContext = createContext("user2");
export const LoggedUserContext = createContext("user1");




export function MainPage() {

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [textInput, setTextInput] = useState("");
    const handleMessageInputChange = (e) => {
        e.preventDefault();
        setTextInput(e.target.value);
        console.log(textInput);
    };
    const handleMessageInputSubmit = (e) => {
        var currTime = new Date().toLocaleString() + "";
        e.preventDefault();
        var newMessagesData = messagesData;
        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser],{
            recieved: false,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser],{
            recieved: true,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];
        setMessagesData(newMessagesData);
        var newContacts = contacts;
        newContacts.map((contact) => {
            if(contact.userName === activeUser){
                contact.message = textInput;
                contact.timeStamp = currTime;
            }
        })
        setContacts(newContacts)
        forceUpdate();
        console.log(newMessagesData)

    };


    return (

        <Container >
            <Row>
            <AddContactButton />
            </Row>
            <Row className="row g-0">
                <Col ><ChatsNavigation /></Col>

            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleMessageInputSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control
                                value={textInput}
                                type="text"
                                onChange={handleMessageInputChange}
                                placeholder="Enter a message">
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Send
                        </Button>
                    </Form>

                </Col>
            </Row>
            <Row>
                <AddFileButton />
            </Row>
        </Container>


    )
}
function AddContactModal(props) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [ formText, setFormText ] = useState("");
    const ResolveUserInfo = (userName) => {
        console.log(userName)
        var recentMsgId = (messagesData[loggedUser])[userName].length - 1;
        var recentMsg = messagesData[loggedUser][userName][recentMsgId];
        var timeStamp = recentMsg.timeStamp;
        var recentMessage, picture, nickName;
        if (recentMsg.type === "text") {
            recentMessage = recentMsg.data
        }
        else {
            recentMessage = recentMsg.type
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
    const handleFormInputChange = (e) => {
        e.preventDefault();
        setFormText(e.target.value);
        console.log(formText)
    };
    const handleFormInputSubmit = (e) => {
        e.preventDefault();
        var newUsersData = usersData;
        newUsersData[loggedUser]["friends"] = [...newUsersData[loggedUser]["friends"],formText];
        setUsersData(newUsersData);
       var newContacts = contacts;
       setContacts([...contacts, ResolveUserInfo(formText)])
       props.onHide();
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
                  <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Contact's Identfier</Form.Label>
              <Form.Control
                                                value={formText}
                                                type="text"
                                                onChange={handleFormInputChange}
              />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleFormInputSubmit}>Add</Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  function AddContactButton() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          +
        </Button>
  
        <AddContactModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }



export function ChatsNavigation(props) {
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);


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
                                    <MessageWindow data={messagesData[loggedUser][chatsInfosData.userName]} />
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
                        <Message data={messageData.data} recieved={messageData.recieved} type={messageData.type} file={messageData.file} />
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
    if (props.type === "text"){
    return (
        <div className="message_image" >
            <p className="message_text">{props.data}</p>
            <img src={image} alt="Info" width="200" height="50" />
        </div>

    )
    }
    else if (props.type === "picture"){
        console.log(props)
        return (
            <div className="message_image" >
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(props.file)} />
                <img src={image} alt="Info" width="200" height="50" />
            </div>
    
        )
        }
}
export function Main() {
    const ResolveUserInfo = (userName) => {

        var recentMsgId = (messagesData[loggedUser])[userName].length - 1;
        var recentMsg = messagesData[loggedUser][userName][recentMsgId];
        var timeStamp = recentMsg.timeStamp;
        var recentMessage, picture, nickName;
        if (recentMsg.type === "text") {
            recentMessage = recentMsg.data
        }
        else {
            recentMessage = recentMsg.type
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
    const [activeUser, setActiveUser] = useState("");
    const [loggedUser, setLoggedUser] = useState("user1");

    var chatUsersSideBarInfo = [];
    ((usersData[loggedUser])["friends"]).map((user) => {

        chatUsersSideBarInfo = [...chatUsersSideBarInfo, ResolveUserInfo(user)]
    })

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



function AddFileModal(props) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [ fileUploaded, setFileUploaded ] = useState();
   
    function handleFileInputChange  (e)  {
        e.preventDefault();
        setFileUploaded(e.target.files[0])
        console.log(e.target.files[0])
        var newMessagesData = messagesData;
        var currTime = new Date().toLocaleString() + "";

        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser],{
            recieved: false,
            type: "picture",
            data: "",
            timeStamp: currTime,
            file: fileUploaded
        }];
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser],{
            recieved: true,
            type: "picture",
            data: "",
            timeStamp: currTime,
            file: fileUploaded
        }];
        setMessagesData(newMessagesData);
        console.log(newMessagesData)
        forceUpdate();
       props.onHide();
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <img src={fileUploaded} />
        <Modal.Body>
        <input type="file" onChange={handleFileInputChange} />
  </Modal.Body>
      </Modal>
    );
  }

  function AddFileButton() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Picture
        </Button>
  
        <AddFileModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }








