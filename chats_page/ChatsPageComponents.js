import React,{ useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import profile from "./images/1.jpg";
import message1 from "./images/sent_message.jpg";
import './ChatsPageComponents.css';
export function Main_Page() {
    return (
        <Container >
            <Row class="row g-0">
                <Col ><SideBar /></Col>
                <Col><MessageWindow /></Col>
            </Row>
        </Container>
    )
}
export function MessageWindow() {
    const [messages, setMessages] = useState([
        {
          recieved: false,
          type: "text",
          data: "hello"
        },
        {
            recieved: true,
            type: "text",
            data: "hello2"
        },
        {
            recieved: false,
            type: "text",
            data: "hello3"
        }
      ]);

    return (
        <Container fluid='true'>
            {messages.map((messageObj) => {
                return (
                    <Row>
                    <Message data={messageObj.data} />
                    </Row>
                );
                })}
        </Container>
    )
}
export function Message(props) {

    return (

        <div className="message_image" >
            <p className="message_text">{props.data}</p>
            <img src={message1} alt="Info" width="200" height="50"/>
        </div>

    )
}


export function NameText() {

    return (
        "Charlie Baz"
    )
}
export function MessageText() {

    return (
        "Have you seen the news?"
    )
}
export function ChatInfo() {

    return (
        <Container fluid='true'>
            <Row>
                <Col ><img src={profile} alt="profile" width="100" height="100" /></Col>
                <Col><NameText /><br /><MessageText /></Col>
                <Col >1 minute ago</Col>
            </Row>
        </Container>
    )
}
export function SideBar() {
    return (
        <ButtonGroup vertical>
            <Button><ChatInfo /></Button>
            <Button><ChatInfo /></Button>
        </ButtonGroup>
    )
}