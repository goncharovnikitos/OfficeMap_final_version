import React from 'react';

let users = [{
    "userId": 1,
    "login": "log",
    "password": "qwerty",
    "lastName": "Иванов",
    "firstName": "Дмитрий",
    "middleName": "Сергеевич",
    "picture": "http",
    "isAdmin": true,
    "email": "dima@mail.ru"
},
    {
        "userId": 2,
        "login": "log2",
        "password": "qwerty2",
        "lastName": "Петров",
        "firstName": "Игорь",
        "middleName": "Викторович",
        "picture": "http1",
        "isAdmin": false,
        "email": "igor@mail.ru"
    },
    {
        "userId": 3,
        "login": "log3",
        "password": "qwerty3",
        "lastName": "Сидоров",
        "firstName": "Николай",
        "middleName": "Алексеевич",
        "picture": "http2",
        "isAdmin": false,
        "email": "kolya@mail.ru"
    },
];

export default
function Users(props) {
    return (
        <div className="peoples" >
            <ul>
                {users.map(
                    (user) => <li key={user.userId} className={user.userId === props.selectedPlace ? 'active' : ''}>
                        {user.lastName} {user.firstName}</li>
                )}
            </ul>
        </div>
    )
}
