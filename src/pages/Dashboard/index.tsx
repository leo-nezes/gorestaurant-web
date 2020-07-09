import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    loadFoods();
  }, []);

  async function handleAddFood({
    name,
    image,
    price,
    description,
  }: Omit<IFoodPlate, 'id' | 'available'>): Promise<void> {
    try {
      const foodIds = foods.reduce((accumulator: number[], foodId) => {
        accumulator.push(foodId.id);

        return accumulator;
      }, []);

      const newFood = {
        id: Math.max(...foodIds) + 1,
        name,
        description,
        price,
        available: true,
        image,
      };

      await api.post('/foods', newFood);

      setFoods([...foods, newFood]);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const { name, description, price, image } = food;

    const updateFood = {
      id: editingFood.id,
      name,
      description,
      price,
      available: editingFood.available,
      image,
    };

    await api.patch(`/foods/${editingFood.id}`, updateFood);

    const newArrayWithUpdatedFood = foods.map(foodMap => {
      if (foodMap.id === updateFood.id) return updateFood;

      return foodMap;
    });

    setFoods(newArrayWithUpdatedFood);
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const newFood = foods.filter(food => food.id !== id);

    setFoods(newFood);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditModalOpen(!editModalOpen);
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
