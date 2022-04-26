import React, { useRef, useState, useMemo, useContext, createContext, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import message_sent from "./images/sent_message.png";
import message_recv from "./images/recv_message.png";
import { MessagesInfo, UsersInfo } from './databaseArrs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import backgroundImage from './images/chatPageBackground.jpg'
import './updated.css'

export const UsersContext = createContext(UsersInfo);
export const MessagesContext = createContext(MessagesInfo);
export const ContactsContext = createContext("");
export const ActiveUserContext = createContext("user2");
export const LoggedUserContext = createContext("user1");
export const forceUpdateContext = createContext("");

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
    };
    const handleMessageInputSubmit = (e) => {
        var currTime = new Date().toLocaleString() + "";
        e.preventDefault();
        var newMessagesData = messagesData;
        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser], {
            recieved: false,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser], {
            recieved: true,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];
        setMessagesData(newMessagesData);
        var newContacts = contacts;
        newContacts.map((contact) => {
            if (contact.userName === activeUser) {
                contact.message = textInput;
                contact.timeStamp = currTime;
            }
        })
        setContacts(newContacts)
        setTextInput("");
        forceUpdate();
    };
    return (
        <Container >
            <Row>
                <Col>
                    <div >
                        <span className="userBar">{loggedUser}  </span>
                    </div>
                </Col>
                <Col> <AddContactButton className="addButton" /></Col>
                <Col></Col>
            </Row>
            <Row className="row g-0">
                <Col ><ChatsNavigation /></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Form className="d-flex align-items-end" onSubmit={handleMessageInputSubmit}
                    >
                        <Form.Group>
                            <Form.Control
                                size="lg"
                                value={textInput}
                                type="text"
                                onChange={handleMessageInputChange}
                                placeholder="Enter a message">
                            </Form.Control>
                        </Form.Group>
                        <Button class="btn btn-outline-success" variant="success" type="submit" >
                            <img src={process.env.PUBLIC_URL + '/sendIcon.png'} height="35" width="35" alt="Record" />
                        </Button>
                        <AddFileButton type="picture" />
                        <AddFileButton type="video" />
                        <RecordAudioButton />
                    </Form>

                </Col>
            </Row>
            <Row>
            </Row>
        </Container>
    )
}
function AddContactModal(props) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [formText, setFormText] = useState("");
    const ResolveUserInfo = (userName) => {
        //update case for users without chat history
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
    };
    const handleFormInputSubmit = (e) => {
        e.preventDefault();
        var newUsersData = usersData;
        newUsersData[loggedUser]["friends"] = [...newUsersData[loggedUser]["friends"], formText];
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
            centered>
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
                            onChange={handleFormInputChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleFormInputSubmit}>Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
function AddContactButton() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>
                Add Contact
            </Button>
            <AddContactModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
export function ChatsNavigation(props) {
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
                            );})}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        {contacts.map((chatsInfosData, index) => {
                            return (
                                <Tab.Pane key={index} eventKey={chatsInfosData.userName}>
                                    <MessageWindow data={messagesData[loggedUser][chatsInfosData.userName]} />
                                </Tab.Pane>);})}
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
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    return (
        <div className="messageWindow">
            <Container fluid='true'>
                {messages.map((messageData, index) => {
                    return (
                        <Row key={index}>
                            <Message data={messageData.data} recieved={messageData.recieved} type={messageData.type} file={messageData.file} />
                        </Row>
                    );
                })}
            </Container>
            <div ref={messagesEndRef} />
        </div>
    )
}
export function Message(props) {
    let image;
    var bubbleClass;
    var dataClass;
    var messageClass;
    if (props.recieved) {
        image = message_recv;
        bubbleClass = "recv_message_bubble";
        dataClass = "recv_message_data";
        messageClass = "recv_message";
    }
    else {
        image = message_sent;
        bubbleClass = "sent_message_bubble";
        dataClass = "sent_message_data";
        messageClass = "sent_message";
    }
    if (props.type === "text") {
        return (
            <div className={messageClass}>
                <div className={bubbleClass}>
                    <p className={dataClass}>{props.data}</p>
                    <img src={image} alt="Info" width="200" height="50" />
                </div>
            </div>
        )
    }
    else if (props.type === "picture") {
        return (
            <div className={messageClass}>
                <div className={bubbleClass} >
                    <img width="150" height="100" src={props.file} className={dataClass} />
                    <img src={image} alt="Info" width="200" height="150" />
                </div>
            </div>
        )
    }
    else if (props.type === "video") {
        console.log("before")
        return (
            <div className={messageClass}>
                <div className={bubbleClass} >
                    <video width="150" height="100" controls className={dataClass}>
                        <source src={props.file} type="video/mp4" />
                    </video>
                    <img src={image} alt="Info" width="200" height="150" />
                    {console.log("after")}
                </div>
            </div>
        )
    }
    else if (props.type === "record") {
        return (
            <div className={messageClass}>
                <div className={bubbleClass} >
                    <audio id="audio" controls className={dataClass} width="100" height="50">
                        <source src={props.file} type="audio/mp3" />
                    </audio>
                    <img src={image} alt="Info" width="300" height="100" />
                </div>
            </div>
        )
    }
}
export function Main({usersMap,loggedUsername}) {
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
    const mapToObj = (inputMap) => {
        const obj = {};
        inputMap.forEach((value, key) =>{ obj[key] = value; });
        return obj; }

    const [usersData, setUsersData] = useState(mapToObj(usersMap));
    const [messagesData, setMessagesData] = useState(MessagesInfo);
    const [activeUser, setActiveUser] = useState("");
    const [loggedUser, setLoggedUser] = useState(loggedUsername);
    const [forceUpdate, setForceUpdate] = useState("temp");
    console.log(usersMap)
console.log(usersData)
    const addNewUsers = () =>{
        var userDataCopy = usersData;
        Object.keys(usersData).forEach((user) => {
            if(!messagesData.hasOwnProperty(user)){
                var newMessagesData = messagesData;
                var newUserEntry = {};
                Object.keys(userDataCopy).forEach((currUser) => {
                    newUserEntry[currUser] = [];
                    newMessagesData[currUser]={};
                    newMessagesData[currUser][user] = [];
                });
                newMessagesData[user] = newUserEntry;
                
                setMessagesData(newMessagesData);
            }
        })
    }


    addNewUsers();
    var chatUsersSideBarInfo = [];
    console.log(usersData);
    console.log(loggedUser);
    

    ((usersData[loggedUser])["friends"]).map((user) => {

        chatUsersSideBarInfo = [...chatUsersSideBarInfo, ResolveUserInfo(user)]
    })
    const [contacts, setContacts] = useState(chatUsersSideBarInfo);
    return (
        <forceUpdateContext.Provider value={{ forceUpdate, setForceUpdate }}>
            <UsersContext.Provider value={{ usersData, setUsersData }}>
                <MessagesContext.Provider value={{ messagesData, setMessagesData }}>
                    <ContactsContext.Provider value={{ contacts, setContacts }}>
                        <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
                            <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
                                <div className="background" style={{ backgroundImage: `url(${backgroundImage}` }}>
                                    <MainPage />
                                </div>
                            </LoggedUserContext.Provider>
                        </ActiveUserContext.Provider>
                    </ContactsContext.Provider>
                </MessagesContext.Provider>
            </UsersContext.Provider>
        </forceUpdateContext.Provider>)
}

function AddFileModal(props) {
    const [, forceUpdate1] = useReducer(x => x + 1, 0);
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const [fileUploaded, setFileUploaded] = useState();
    function handleFileInputChange(e) {
        e.preventDefault();
        var reader = new FileReader();
        var url = URL.createObjectURL(e.target.files[0]);
        setFileUploaded(url)
        var newMessagesData = messagesData;
        var currTime = new Date().toLocaleString() + "";
        var fileType = props.type;
        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser], {
            recieved: false,
            type: fileType,
            data: "",
            timeStamp: currTime,
            file: url
        }];
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser], {
            recieved: true,
            type: fileType,
            data: "",
            timeStamp: currTime,
            file: url
        }];
        setMessagesData(newMessagesData);
        setForceUpdate(currTime);
        props.onHide();
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <input type="file" onChange={handleFileInputChange} />
            </Modal.Body>
        </Modal>
    );
}
function AddFileButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    var icon = props.type + "Icon.png";
    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>
                <img src={process.env.PUBLIC_URL + '/' + icon} height="35" width="35" alt={props.type} />
            </Button>
            <AddFileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={props.type}/>
        </>
    );
}


function RecordAudioModal(props) {
    const [, forceUpdate1] = useReducer(x => x + 1, 0);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream);
    }
    console.log("before3")
    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }
        if (isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }
        const saveRecording = (e) => {
            var url = URL.createObjectURL(e.data);
            console.log(url)
            var newMessagesData = messagesData;
            var currTime = new Date().toLocaleString() + "";
            var fileType = props.type;
            newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser], {
                recieved: false,
                type: "record",
                data: "",
                timeStamp: currTime,
                file: url
            }];
            newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser], {
                recieved: true,
                type: "record",
                data: "",
                timeStamp: currTime,
                file: url
            }];
            setMessagesData(newMessagesData);
        };
        recorder.addEventListener("dataavailable", saveRecording);
        return () => recorder.removeEventListener("dataavailable", saveRecording);
    }, [recorder, isRecording]);
    const handleRecording = (e) => {
        console.log("before4")
        if (!isRecording) {
            console.log("start");
            setIsRecording(true);
        }
        else {
            setIsRecording(false);
            var currTime = new Date().toLocaleString() + "";
            setForceUpdate(currTime);
            props.onHide()
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {console.log("before5")}
            <Modal.Body className="recordingModal">
                <Button variant="success" onClick={(e) => {
                    handleRecording(e);}}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
            </Modal.Body>
        </Modal>
    );
}
function RecordAudioButton() {
    const [modalShow, setModalShow] = useState(false);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const update = (e) => {
        setForceUpdate(new Date().toLocaleString() + "");
    }
    return (
        <>
            <Button class="btn btn-outline-success" variant="success" onClick={() => setModalShow(true)}>
                <img src={process.env.PUBLIC_URL + '/audioIcon.png'} height="35" width="35" alt="Record" />
            </Button>
            <RecordAudioModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onExited={update}
            />
        </>
    );
}