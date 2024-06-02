"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "./components/card/card";

export default function Home() {
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [SearchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  let handleClick = (str) => {
    router.push(`/${str}`);
    console.log(str);
  };

  let FetchData = async (query) => {
    setLoading(true);
    try {
      const Apires = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const result = await Apires.json();
      setData(result.meals);
    } catch (error) {
      console.error(error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchData(""); // Fetch data for default query (pizza)
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    FetchData(SearchQuery);
  };

  return (
    <>
      <nav className="bg-white w-full text-black flex justify-between p-2 items-center">
        <h1 className="logo text-3xl">logo here</h1>
        <div className="search">
          <input
            type="text"
            className="w-[500px] p-2 m-2"
            value={SearchQuery}
            onChange={handleInputChange}
            placeholder="Enter Food"
          />
          <button onClick={handleSearch} className="bg-red-500 p-2">Search</button>
        </div>
      </nav>
      <div className="flex flex-row flex-wrap p-7 ">
        {Loading ? (
          <div className="text-2xl">Loading ...</div>
        ) : Data && Data.length > 0 ? (
          Data.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-red-600 m-2 p-2"
              onClick={() => {
                handleClick(meal.idMeal);
              }}
            >
              <Card img={meal.strMealThumb} h1={meal.strMeal} />
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </>
  );
}
