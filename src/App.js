import React from 'react';
// import logo from './logo.svg';
// import ReactDOM from 'react-dom';
import './App.css';

import Footer from './Footer';
import Card from './Card';
import Accordion from './Accordion';
import Animeback from './Animeback';
import TextAmin from './TextAmin';

// React component (main component)
class App extends React.Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>

        <Animeback />
        <TextAmin />
        <Card />
        <Accordion />
        <Footer />
      </div>
    )
  }
}

export default App;
// Render component
// ReactDOM.render(<App />, App);
