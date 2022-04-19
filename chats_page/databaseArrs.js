import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
export function MessagesInfo() {
    const [messages, SetMessages] = useState({
        "user1": [{
            recieved: false,
            type: "text",
            data: "hello1",
            timeStamp: "16:02"
        },
        {
            recieved: false,
            type: "text",
            data: "hello2",
            timeStamp: "17:02"
        },
        {
            recieved: true,
            type: "text",
            data: "hello3",
            timeStamp: "18:02"
        },
        {
            recieved: false,
            type: "text",
            data: "hello4",
            timeStamp: "19:02"
        }],
        "user2": [{
            recieved: true,
            type: "text",
            data: "wow1",
            timeStamp: "11:02"
        },
        {
            recieved: false,
            type: "text",
            data: "wow2",
            timeStamp: "12:02"
        },
        ],
        "user3": [{
            recieved: false,
            type: "text",
            data: "yay1",
            timeStamp: "17:02"
        },
        {
            recieved: true,
            type: "text",
            data: "yay2",
            timeStamp: "18:02"
        },
        ]
    });
    return messages;
}
export function UsersInfo() {
    const [messages, SetMessages] = useState({
        "user1": {
            nickname: "user1Rocks",
            password: "user1pass",
            profile:    "./images/profile_1.jpg",
            friends: ["user2", "user3"]
        },
        "user2": {
            nickname: "user2Rocks",
            password: "user2pass",
            profile:    "./profile_1.jpg",
            friends: ["user3"]
        },
        "user3": {
            nickname: "user3Rocks",
            password: "user3pass",
            profile:    "./profile_1.jpg",
            friends: []
        }
    });
    return messages;
}