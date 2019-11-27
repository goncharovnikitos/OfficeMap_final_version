import React from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import RegPage from "./components/RegPage";
import AuthPage from "./components/AuthPage";
import NotFoundPage from "./components/NotFoundPage";
import ListUser from "./components/ListUsers";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from './config';
import jQuery from "jquery";
import Menu from "./components//Menu";
const apiPrefix = config.apiPrefix;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class App extends React.Component {
    // используем конструктор, чтобы провести инициализацию только 1 раз
    constructor(props) {
        super(props);
        this.state = {
            placeId: null,
            users: [],
            user_id: 'guest',
            user_data: {}
        };
        this.init = () => {
            let _this = this;
            jQuery.get(apiPrefix + '/get-login', function(res){
                // получим res = user._id (сгенерированный _id) или 'guest'
                _this.setState({
                    user_id: res
                });
                if (res!=='guest'){
                    jQuery.get(apiPrefix + '/find-user/' + res, function(res){
                        console.log(res);
                        _this.setState({
                            user_data: res
                        });
                    });
                }
            });
        };
        this.getAll = () => {
            axios.get(apiPrefix + '/users')
            // .then(resp => resp.json())
                .then( (response) => {//когда ответ получим - можем вызвать функцию
                    this.setState({
                        users: response.data
                    });
                })
                .catch( (error) => {
                    console.error(error);
                });
        };
        this.init();
    }

    render() {
        let userItems = [];
        let users = this.state.users;
        for (let i = 0; i < users.length; i++) {
      //      userItems.push(<span eventKey="{i}">{users[i].text}</span>)
         //   userItems.push(<UserListItems user="{users[i]}">{users[i].text}</UserListItems>)
        }
        let loginBtn = '';
        if (this.state.user_id === 'guest')
            loginBtn = <a href="/auth">Войти</a>
        else
            loginBtn = <span>Привет, {this.getUserName()}! <a href="/#" onClick={this.logout}>Выйти</a></span>
        return (
            <div className="App">
                <header className="App-header">
                <div className="flex">
                     <div>
                         <h1>
                             Office map
                         </h1>
                     </div>
                     <div className="login">
                         <p>
                             {loginBtn}
                             {/*{userItems}*/}
                         </p>
                     </div>
                     
                     </div>
                </header>
                <Router>
                    <Switch>
                        
                        <Route exact path="/reg" component={RegPage} />
                        <Route exact path="/auth" component={AuthPage} />
                        <Route path="/" component={MainPage} />
                        <Route component={NotFoundPage} />
                        
                    </Switch>
                </Router>
            </div>

        );
    }

    getUserName() {
        let userData = this.state.user_data;
        if (this.state.user_id === 'guest' || !userData || !userData._id) return '';
        let s = userData.firstName + ' ' + userData.middleName + ' ' + userData.lastName;
        if (s === '  ') s = userData.login;
        return s;
    }

    logout() {
        jQuery.get(apiPrefix + '/logout', function(){
            document.write('<script>location.href="/"</script>');
        });
    }
}

export default App;