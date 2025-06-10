import { useEffect, useState, useCallback } from 'react';
import classes from './foodsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState();
  const { searchTerm } = useParams();

  const loadFoods = useCallback(async () => {
  const foods = searchTerm ? await search(searchTerm) : await getAll();
  setFoods(foods);
}, [searchTerm]);

useEffect(() => {
  loadFoods();
}, [loadFoods]);


  const FoodsNotFound = () => {
    if (foods && foods.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/foods" linkText="Mostrar todo" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Volver al administrador!" />
    );
  };

  const deleteFood = async food => {
    const confirmed = window.confirm(`Eliminar comida ${food.name}?`);
    if (!confirmed) return;

    await deleteById(food.id);
    toast.success(`"${food.name}" Ha sido eliminada!`);
    setFoods(foods.filter(f => f.id !== food.id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Administrador" margin="1rem auto" />
        <Search
          searchRoute="/admin/foods/"
          defaultRoute="/admin/foods"
          margin="1rem 0"
          placeholder="Buscar comidas"
        />
        <Link to="/admin/addFood" className={classes.add_food}>
          Agregar comida +
        </Link>
        <FoodsNotFound />
        {foods &&
          foods.map(food => (
            <div key={food.id} className={classes.list_item}>
              <img src={food.imageUrl} alt={food.name} />
              <Link to={'/food/' + food.id}>{food.name}</Link>
              <Price price={food.price} />
              <div className={classes.actions}>
                <Link to={'/admin/editFood/' + food.id}>Editar</Link>
                <Link onClick={() => deleteFood(food)}>Eliminar</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
