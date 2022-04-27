import { useState } from "react";

export const MySelect = () => {
  const animals = ["Животные", "Рыбы"];
  const beasts = ["Леопард", "Саблезуб", "Олень"];
  const fishes = ["Окунь", "Лещь"];

  const [animalValue, setAnimalValue] = useState("Животные");
  const handleAnimalChange = (e) => {
    setAnimalValue(e.target.value);
  };

  const [beastValue, setBeastValue] = useState("Леопард");
  const handleBeastChange = (e) => {
    setBeastValue(e.target.value);
  };

  const [fishValue, setFishValue] = useState("Окунь");
  const handleFishChange = (e) => {
    setFishValue(e.target.value);
  };
  return (
    <div>
      <select value={animalValue} onChange={handleAnimalChange}>
        {animals.map((i) => {
          return <option value={i} key={i}>{i}</option>;
        })}
      </select>

      {animalValue === animals[0] && (
        <select value={beastValue} onChange={handleBeastChange}>
          {beasts.map((i) => {
            return <option value={i} key={i}>{i}</option>;
          })}
        </select>
      )}
      {animalValue === animals[1] && (
        <select value={fishValue} onChange={handleFishChange}>
          {fishes.map((i) => {
            return <option value={i} key={i}>{i}</option>;
          })}
        </select>
      )}
    </div>
  );
};
