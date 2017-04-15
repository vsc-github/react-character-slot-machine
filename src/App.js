/**
 * Created by vishwas on 18/3/17.
 */

import React from 'react';
import { Motion, spring, presets } from 'react-motion';
class AlphabetSpinner extends React.Component {
    constructor(){
        super();
        this.alphabets = '\', @-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.'.split('');
    }

    findPosition = (char) => {
        return this.alphabets.indexOf(char);
    }

    render(){
        return (
            <Motion defaultStyle={{top: 0}} style={{top: spring(this.findPosition(this.props.alphabet), presets.wobbly) }}>
                {val => {
                    let style = {
                        position: 'absolute',
                        top: (val.top*55)*-1
                    }
                    return (
                        <div className="bit">
                            <div style={style}>
                                {this.alphabets.map(char => {
                                    let bitClass = 'bit-char';
                                    if(char === this.props.alphabet){
                                        bitClass += ' active '
                                    }
                                    return <div key={char} className={bitClass}>{char}</div>
                                })}
                            </div>
                        </div>
                    )
                }}
            </Motion>
        )
    }
}

class CharSpinners extends React.Component {
    constructor(){
        super();
    }
    render(){
        let spinners = this.props.str.split('').map((alphabet, i) => <AlphabetSpinner key={i} alphabet={alphabet} />)
        return (
            <div className="holder">{spinners}</div>
        );
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {stdOut: 'Welcome to Pied Piper'}
    }

    setString(s){
        this.setState({stdOut: s});
    }

    render(){
        return (
            <div>
                <div className="bits">
                    <CharSpinners str={this.state.stdOut} />
                </div>
                <Controls m={this.setString.bind(this)} />
            </div>
        );
    }
}

class Controls extends React.Component {
    render(){
        let controls = [
            { txt: 'PiedPiper', content: "piedpiper", url: "http://www.piedpiper.com/" },
            { txt: 'Bachmanity', content: "bachmanity", url: 'http://www.bachmanity.com/' },
            { txt: 'Instagram', content: "instagram", url: 'https://www.instagram.com/siliconhbo/' },
            { txt: 'Facebook', content: "facebook", url: 'https://www.facebook.com/SiliconHBO' }
        ]
        return  (
            <div className="bit-inputs">
                {controls.map((control, i) => <Input url={control.url} key={i} m={this.props.m} txt={control.txt} content={control.content} />)}
            </div>
        );
    }
}

class Input extends React.Component {
    render(){
        return (
            <div className="input-item" onMouseOver={this.props.m.bind(null,this.props.txt)}>
                <a href={this.props.url} target="_blank">
                    <span className='symbol'>{this.props.content}</span>
                </a>
            </div>
        );
    }
}


export default App;
