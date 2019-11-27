import React from 'react';
import RegForm from './User/RegForm';

export default function RegPage() {
    return(
        <div className="RegPage">
            <p>Страница регистрации</p>
            <RegForm/>
        Вы зарегистрированы? Пройдите по
         <a href="/auth" className="">ссылке</a>
        </div>
         /*<div class="not_login">
         Вы зарегистрированы? Пройдите по
         <a href="http://localhost:8080/users" className="">ссылке</a>
     </div>*/
    )
}