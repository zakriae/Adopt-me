import React, {useState, useEffect} from "react";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from "./useBreedList";
import Results from "./Results";


const SearchParams = () => {

    const [location, updateLocation] = useState("Seattle, WA"); 
    const [animal, updateAnimal] = useState("");
    const [breed, updateBreed] = useState("");
    const [breeds] = useBreedList(animal);
    const [pets, setPets] = useState([]);


    

    useEffect(() => {
        requestPets();
      }, []);

      async function requestPets() {
        const res = await fetch(
          `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
      
        setPets(json.pets);
      }

    return (
      <div className="search-params">
        <form  onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
          <label htmlFor="location">
            Location
            <input id="location" 
                   value={location} 
                   placeholder="Location" 
                   onChange={(e) => updateLocation(e.target.value)} />
          </label>
          <label htmlFor="animal">
            Animal
            <select
                id="animal"
                value={animal}
                onChange={(e) => updateAnimal(e.target.value)}
                onBlur={(e) => updateAnimal(e.target.value)}
            >
                <option />
                {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                    {animal}
                </option>
                ))}
            </select>
            </label>
            <label htmlFor="breed">
            Breed
            <select
                disabled={!breeds.length}
                id="breed"
                value={breed}
                onChange={(e) => updateBreed(e.target.value)}
                onBlur={(e) => updateBreed(e.target.value)}
            >
                <option />
                {breeds.map((breed) => (
                <option key={breed} value={breed}>
                    {breed}
                </option>
                ))}
            </select>
            </label>

          <button>Submit</button>
        </form>

        <Results pets={pets} />;
        {/* {
        pets.map((pet) => (
            <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
        ))
        } */}
      </div>

    );
  };
  
  export default SearchParams;