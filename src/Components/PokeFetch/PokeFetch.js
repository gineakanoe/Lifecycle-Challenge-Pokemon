import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
    }  
  }

  componentDidMount() {
    console.log('called component did mount');

  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timer: 10,
        })
      })
      .catch((err) => console.log(err))
  }

  startTimer = () => {
    let interval = setInterval(() => {
      if (this.state.timer === 0) {
        clearInterval(interval);
      } else if (
        this.setState({
          timer: this.state.timer -1
        })
      );
      console.log(this.state.timer);
    }, 1000);
  };
 


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.startTimer()}}>Start!</button>
        <h1 className={'timer'} >Who's That Pokemon?!? <hr /> Timer: {this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} alt='' src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;