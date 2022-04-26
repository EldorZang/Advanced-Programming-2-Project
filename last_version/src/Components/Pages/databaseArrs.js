import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
export function MessagesInfo() {
    return ({
        "user1": {
            "user2": [{
                recieved: true,
                type: "text",
                data: "wow1",
                timeStamp: "11:02",
                file: ""
            },
            {
                recieved: false,
                type: "text",
                data: "wow2",
                timeStamp: "12:02",
                file: ""
            },
            {
                recieved: false,
                type: "picture",
                data: "",
                timeStamp: "12:02",
                file: process.env.PUBLIC_URL + '/sendIcon.png'
            }
            ],
            "user3": [{
                recieved: false,
                type: "text",
                data: "yay1",
                timeStamp: "17:02",
                file: ""
            },
            {
                recieved: true,
                type: "text",
                data: "yay2",
                timeStamp: "18:02",
                file: ""
            }
            ]
        },
        "user2": {
            "user1": [{
                recieved: false,
                type: "text",
                data: "wow1",
                timeStamp: "11:02",
                file: ""
            },
            {
                recieved: true,
                type: "text",
                data: "wow2",
                timeStamp: "12:02",
                file: ""
            },
            {
                recieved: true,
                type: "picture",
                data: "",
                timeStamp: "12:02",
                file: "process.env.PUBLIC_URL + '/sendIcon.png'"
            }
            ],
            "user3": {
                "user1": [{
                    recieved: false,
                    type: "text",
                    data: "wow1",
                    timeStamp: "11:02",
                    file: ""
                },
                {
                    recieved: true,
                    type: "text",
                    data: "wow2",
                    timeStamp: "12:02",
                    file: ""
                }
                ]
            }
        },
        "user3":{
            "user1": [],
            "user2": []
        }
    }
    );
}
export function UsersInfo() {
    return ({
        "user1": {
            nickName: "user1Rocks",
            password: "user1pass",
            profile: "profile_1.jpg",
            friends: ["user2"]
        },
        "user2": {
            nickName: "user2Rocks",
            password: "user2pass",
            profile: "profile_1.jpg",
            friends: ["user3"]
        },
        "user3": {
            nickName: "user3Rocks",
            password: "user3pass",
            profile: "profile_1.jpg",
            friends: []
        }
    }
    );
}
