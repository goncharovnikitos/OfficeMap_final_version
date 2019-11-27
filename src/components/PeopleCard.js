import React from 'react';
import photo from '../photo.jpg'
import photo2 from '../photo2.jpg'

let users = [
    {
        "userId": 1,
        "login": "log",
        "password": "qwerty",
        "lastName": "Иванов",
        "firstName": "Дмитрий",
        "middleName": "Сергеевич",
        "picture": '/photo.jpg',
        "isAdmin": true,
        "email": "dima@mail.ru"
    }, {
        "userId": 2,
        "login": "log",
        "password": "qwerty",
        "lastName": "Иванова",
        "firstName": "Лена",
        "middleName": "Петровна",
        "picture": '/photo2.jpg',
        "isAdmin": true,
        "email": "lena@mail.ru"
    },
];

export default function PeopleCard(props) {
    let placeId = props.placeId;
    let user = placeId ? users[placeId - 1] : null;
   
    if (!placeId) return (
        <div className="card">
            Выберите место
        </div>
    );
    if (!user) return (
        <div className="card">
            Место свободно
        </div>
    );

    return (
        <div className="card">
            <ul>
               <li><img src={user.picture} alt='Фото сотрудника' height={100}/></li>
               <li>{user.lastName} {user.firstName} {user.middleName} {}</li>
               <li>Email - {user.email}</li>
           </ul>
       </div>
   )
}