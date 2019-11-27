import React from 'react';


export default function Menu() {
    return(
        <div className="Menu">
        <ul>
            <li><a href="/listusers" className="">Список пользователей</a></li>
            <li><a href="/map" className="">Карта</a></li>
        </ul>
        </div>
    )
}