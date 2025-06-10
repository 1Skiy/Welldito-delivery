import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { getById, updateUser } from '../../services/userService';
import { useParams } from 'react-router-dom';
import classes from './userEdit.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import { EMAIL } from '../../constants/patterns';
import Button from '../../components/Button/Button';

export default function UserEditPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userId } = useParams();
  const isEditMode = userId;

  const loadUser = useCallback(async () => {
  const user = await getById(userId);
  reset(user);
}, [userId, reset]);

useEffect(() => {
  if (isEditMode) loadUser();
}, [isEditMode, loadUser]);

  const submit = userData => {
    updateUser(userData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Editar Usuario' : 'Agregar usuario'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="Nombre"
            {...register('name', { required: true, minLength: 3 })}
            error={errors.name}
          />
          <Input
            label="Email"
            {...register('email', { required: true, pattern: EMAIL })}
            error={errors.email}
          />
          <Input
            label="Dirección"
            {...register('address', { required: true, minLength: 5 })}
            error={errors.address}
          />

          <Input label="Es administrador" type="checkbox" {...register('isAdmin')} />
          <Button type="Enviar" />
        </form>
      </div>
    </div>
  );
}
