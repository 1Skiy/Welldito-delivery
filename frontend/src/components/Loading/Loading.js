import React from 'react';
import { useLoading } from '../../hooks/useLoading';
import classes from './loading.module.css';

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <img src="/loading.svg" alt="Cargando!" />
        <h1>Cargando...</h1>
      </div>
    </div>
  );
}
