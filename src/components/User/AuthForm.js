import React from 'react';
import jQuery from 'jquery';
import config from '../../config';
const apiPrefix = config.apiPrefix;

export default class AuthForm extends React.Component {
    state = {
        placeId: null,
        users: [],
        res: null
    };
    sendForm = function(e){
        let _this = this;
        jQuery.post(apiPrefix + '/login', jQuery('form').serializeArray(), function(res){
           if (res === 'ok'){
               alert("Вы успешно авторизовались");
               document.write('<script>location.href="/"</script>')
           } else {
               alert(res);
           }
        });

        e.preventDefault();
    };
    render() {
        return (
            <div className="content1">
                <link rel="stylesheet" href="style.css"/>
                <div className="login_form_central_form">
                <form onSubmit={this.sendForm} encType="multipart/form-data" method="post">
                    <div className="title">Введите данные для авторизации</div>
                    <div className="user"><label for="login_user">Логин: </label><input id="login_user" type="text"
                                                                                        name="login"/>
                    </div>
                    <div className="pass"><label for="login_pass">Пароль: </label><input id="login_pass" type="password"
                                                                                         name="password"/>
                    </div>
                    <div className="submit"><input type="submit" value="Авторизоваться"/></div>
                </form>
                </div>
            </div>
        );
    }
}