import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchItemsRecipes } from '../redux/actions';
import MainPageFilters from '../components/MainPageFilters';

function Foods({ history }) {
  const foods = useSelector((state) => state.foods.recipes.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!foods) return;
    const firstMealId = foods[0].idMeal;
    if (foods.length === 1) history.push(`/foods/${firstMealId}`);
  }, [foods, history]);

  useEffect(() => {
    dispatch(fetchItemsRecipes('any', '', 'Foods'));
  }, [dispatch]);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Foods"
      />
      <MainPageFilters pageTitle="Foods" />
      {
        foods && foods.map((meal, index) => {
          const max = 11;
          if (index > max) return;
          return (<Card
            key={ meal.strMeal }
            img={ meal.strMealThumb }
            index={ index }
            title={ meal.strMeal }
          />);
        })
      }
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Foods;
