import React from 'react';

import parse from 'html-react-parser';
import map from './map.svg'

export default
class Map extends React.Component {

    //<img src={map} onClick={e=>console.log(e.nativeEvent)}/>
    async componentDidMount() {
        let m = await fetch(map);
        let text = await m.text();
        console.log(text);
        this.setState({text:text});

    }

    state = {
      text: ''
    };

    render() {
        if (!this.state.text) return null;
        return (
            <div className="map">{parse(this.state.text,
                {
                    replace: (domNode) => {
                        if (domNode.attribs && domNode.attribs['data-placeid']) {
                            domNode.attribs = domNode.attribs || {};
                            domNode.attribs['onClick'] = this.props.onPlace;
                            if (domNode.attribs['data-placeid'] === this.props.placeId)
                                domNode.attribs['fill'] = 'red';
                            return React.createElement(domNode.name, domNode.attribs, domNode.children);
                        }
                    }
                })}
            </div>
        )
    }
}