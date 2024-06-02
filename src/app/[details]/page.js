import React from "react";

const FetchData = async (param) => {
  try {
    const Apires = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`
    );
    const result = await Apires.json();
    return result.meals[0];
  } catch (error) {
    return <div>Err: {error.message}</div>; // Display error message
  }
};

const Page = async ({ params }) => {
  console.log(params.details);
  const data = await FetchData(params.details);

  // Check if data is an error component
  if (React.isValidElement(data) && data.type === 'div' && data.props.children.startsWith('Err')) {
    return data; // If data is an error component, return it directly
  }

  // Split the instructions into an array of steps
  const stepsArray = data.strInstructions
    .split("\n")
    .filter((step) => step.trim() !== "");

  // Create arrays for ingredients and measures
  const ingredientsArray = [];
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredientsArray.push(
        `${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
      );
    } else {
      break; // Stop if no more ingredients
    }
  }

  return (
    <div className="bg-red-500 flex flex-col justify-center h-min p-[100px]">
      <img src={data.strMealThumb} alt="Data"  className="w-[600px] h-[500px] relative mx-auto border-slate-900 " />
      <h1 className="text-5xl">{data.strMeal}</h1>
      <h2 className="text-2xl">Ingredients:</h2>
      <ul className="list-disc pl-5">
        {ingredientsArray.map((ingredient, index) => (
          <li key={index} className="text-lg">
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl">Instructions:</h2>
      <ul className="list-disc pl-">
        {stepsArray.map((step, index) => (
          <li key={index} className="text-lg">
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
