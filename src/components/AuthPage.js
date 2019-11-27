import React from 'react';
import AuthForm from './User/AuthForm';

export default function AuthPage() {
    return(
        <div className="AuthPage">
            <p>Страница доступа</p>
            <AuthForm/>
            Вы не зарегистрированы? Пройдите по
         <a href="/reg" className="">ссылке</a>
        </div>
    )
}