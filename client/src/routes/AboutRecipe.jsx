import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RecipeInfo from "../components/RecipeInfo";
import {BASE_URL} from "../helper/ref.js";
import Axios from "axios";
import { useParams } from "react-router-dom";

const AboutRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setLoading(true);
    Axios.post(`${BASE_URL}/recipe/recipeFindById`, {
      recipeId: id,
    })
      .then((response) => {
        console.log(response.data[0]);
        setRecipe(response.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <RecipeInfo
          key={recipe._id}
          userId={recipe.userId}
          recipeName={recipe.recipeName}
          recipeIngradients={recipe.recipeIngradients}
          recipeDescription={recipe.recipeDescription}
          recipeNote={recipe.recipeNote}
          recipeSaveTime={recipe.recipeSaveTime}
          recipeImageId={recipe.recipeImageId}
          recipeId={recipe._id}
        />
      )}
    </>
  );
};

export default AboutRecipe;
