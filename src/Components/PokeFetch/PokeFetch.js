import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,                                                  // added 'timer' state 
    }  
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
          timer: 10,                                                // set 'timer' state along with other states 
        })
      })
      .catch((err) => console.log(err))
  }

  startTimer = () => {                                              // setInterval(() => {this.state.timer}, 1000) -> basic format
    let interval = setInterval(() => {  
      if (this.state.timer === 0) {                                 // if timer is 0, clear interval logic
        clearInterval(interval);
      } else if (
        this.setState({                                             // otherwise continue to set the state of 'timer' -1 interval aka second
          timer: this.state.timer -1
        })
      );
      console.log(this.state.timer);                                // console log the numbers as timer counts down to show it is working
    }, 1000);                                                       // runs at a rate of 1000 milliseconds
  };
 


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.startTimer()}}>Start!</button>
                                                                        {/* renders the timer's state */}
        <h1 className={'timer'} >Who's That Pokemon?!? <hr /> Timer: {this.state.timer}</h1>
        <div className={'pokeWrap'}>
                                {/* css styling; conditional statement; expression if condition truthy; expression if condition falsy */}
          <img className={'pokeImg'} style={this.state.timer === 0 ? {filter: "brightness(100%)"} : {filter: "brightness(0%)"}} alt='' src={this.state.pokeSprite} />
          <h1 className={'pokeName'} style={this.state.timer === 0 ? {color: "black"} : {color: "transparent"}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;