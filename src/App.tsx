import React, { useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';

const server = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [id, setId] = useState(1); 
  const [pokemon, setPokemon] = useState({name: "", sprite: "", types: []});
  const [fail, setFail] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setId(Number(event.target.value)); 
  }

  function searchPokemon(){
    let req = server + id.toString();
    fetch(req)
    .then((response) => response.json())
    .then((data) => {
      const newPokemon = {
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((typeObj: { type: { name: string } }) => typeObj.type.name)
      };
      setPokemon(newPokemon);
      setFail(false);
    })
    .catch((error) => {
      console.log("erreur : ", error )
      setFail(true);
    });
  }

  function DisplayTypes(){
    const listTypes = pokemon.types.map((type,index) =>
        <li id={"type-"+index}>{type}</li>
    )
    return(
      <ul id="types">
        {listTypes}
      </ul>
    )
  }

  function DisplayPokemon(){
    if(!fail && pokemon.name !== ""){
      return(
        <div id="infos">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprite} alt={pokemon.name}></img>
          <DisplayTypes />
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <div>
        <input id='pkId' type='number' value={id} onChange={handleInputChange}></input>
        <button onClick={() => searchPokemon()}>Search</button>
        <DisplayPokemon />
      </div>
    </div>
  );
}

export default App;
