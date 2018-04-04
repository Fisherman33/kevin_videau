import React from 'react';
import './TextAmin.css';

class TextAmin extends React.Component {
    render() {
        return (
            <div className="sp-container">
                <div className="sp-content">
                    <div className="sp-globe"></div>
                    <h2 className="frame-1">Une idée</h2>
                    <h2 className="frame-2">Un projet</h2>
                    <h2 className="frame-3">Un objectif</h2>
                    <h2 className="frame-4">Un développeur</h2>
                    <h2 className="frame-5">
                        <span>CREATION,</span>
                        <span>CHANGE,</span>
                        <span>EXPERIANCE.</span>
                    </h2>
                    {/*<a className="sp-circle-link" href="https://nick.mkrtchyan.ga">K</a>*/}
                </div>
            </div>
        )
    }

}
export default TextAmin;