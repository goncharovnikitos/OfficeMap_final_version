import React from 'react';
import View3 from "./View3";
import Menu from "./Menu";
import axios from 'axios';
import ListUser from "./ListUsers";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    state = {
        placeId: null,
        users: []
    };

    render() {
        if (!this.state.users.length){
            this.getAll();
        }
        // console.log('App props', this.props);
        let userItems = [];
        let users = this.state.users;
        for (let i = 0; i < users.length; i++) {
            // userItems.push(<span eventKey="{i}">{users[i].text}</span>)
            //   userItems.push(<UserListItems user="{users[i]}">{users[i].text}</UserListItems>)
        }
        return (
            <div className="App">
                <Menu/>
            <Router>
            <Switch>
                <Route exact path="/map" component={View3} />
                <Route exact path="/listusers" component={ListUser} />
            </Switch>
        </Router>
            
            </div>

        );
    }

    getAll() {
        axios.get('http://localhost:8080/users')
        // .then(resp => resp.json())
            .then( (response) => {//когда ответ получим - можем вызвать функцию
                // console.info(response);
                this.setState({
                    users: response.data
                });
            })
            .catch( (error) => {
                console.error(error);
            });
    }
}

export default App;
