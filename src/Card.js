import React from 'react';
// import logo from './logo.svg';
import './Card.css';




// React component for form inputs
class CardInput extends React.Component {
  render() {
    return (
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return (
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}

// React component for form button
class CardBtn extends React.Component {
  render() {
    return (
      <fieldset>
        <button className={this.props.className} type={this.props.type} value={this.props.value}>{this.props.value}</button>
      </fieldset>
    )
  }
}

// React component for social profile links
class CardProfileLinks extends React.Component {
  render() {
    const profileLinks = ['twitter', 'linkedin', 'facebook'];

    const linksList = profileLinks.map((link, index) =>
      <li key={index}><a ><i className={'fab fa-' + link}></i></a></li>
    );

    return (
      <div className='card-social-links'>
        <ul className='social-links'>
          {linksList}
        </ul>
      </div>
    )
  }
}

// React component for the front side of the card
class CardFront extends React.Component {
  render() {
    return (
      <div className='card-side text-center cardf side-front'>
      
        <div className='container-fluid'>
            
          <div className="row">
          
            <div className='col-xs-12 center  side-front-content'>
                <h1>Kévin Videau</h1>
              <h1>Développeur Web Fullstack</h1>
              <p>.</p>
              <p>Création de site web</p>
              <p>.</p>
              <p>Animation</p>
              <p>.</p>
              <p>Création d'Application Mobile</p>
            </div>
          </div>
          <div className='row'>

            {/*<img className='col-xs-4' src='http://www.formation-fullstack.fr/Img/front-end-developpeur-fullstack.png' alt="" />
            <img className='col-xs-4' src="http://evincedev.com/blog/wp-content/uploads/2017/07/Mean.jpg" alt="" />
            <img className='col-xs-4' src="https://teamairship.com/wp-content/uploads/2017/10/react-native-workshop.jpg" alt="" />*/}

          </div>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render() {
    return (
      <div className='card-side side-back'>
        <div className='container-fluid'>
          <h1>Demande d'information</h1>

          <form formAction='' className='card-form'>
            <div className='row'>
              <div className='col-xs-6'>
                <CardInput name='contactFirstName' id='contactFirstName' type='text' placeholder='Prénom' />
              </div>

              <div className='col-xs-6'>
                <CardInput name='contactLastName' id='contactLastName' type='text' placeholder='Nom' />
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-6'>
                <CardInput name='contactEmail' id='contactEmail' type='email' placeholder='Email' />
              </div>

              <div className='col-xs-6'>
                <CardInput name='contactSubject' id='contactSubject' type='number' placeholder='Téléphone' />
              </div>
            </div>

            <CardTextarea name='contactMessage' id='contactMessage' placeholder='Votre message' />

            <CardBtn className='btn btn-primary' type='submit' value='Envoyer' />
          </form>

          <CardProfileLinks />
        </div>
      </div>
    )
  }
}

// React component for the card (main component)
class Card extends React.Component {
  render() {
    return (
        <div className='card-container'>
          <div className='card-body'>
            <CardBack />

            <CardFront />
            </div>
        </div>
    )
  }
}

export default Card;
// Render Card component
