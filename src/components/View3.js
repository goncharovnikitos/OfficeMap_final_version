import React from 'react';
import MapComp from "./MapComp";
import PeopleCard from "./PeopleCard";
import AddUserForm from "./User/AuthForm";

export default class View3 extends React.Component {
    state = {
        placeId: null
    };
    render() {
        return (
            <div className="body3">
                <MapComp placeId={this.state.placeId} onPlace={(e) => {
                    this.setState({placeId: e.target.dataset.placeid});
                    console.log(e.target.dataset.placeid);
                }
                }/>
                {/*<UsersComp selectedPlace={dict[this.state.placeId]}/>*/}
                <PeopleCard placeId={this.state.placeId}/>
                {/*<AddUserForm />*/}
            </div>
            
        )
    }
}

