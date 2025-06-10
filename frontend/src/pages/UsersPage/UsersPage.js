import React, { useEffect, useState, useCallback  } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAll, toggleBlock } from '../../services/userService';
import classes from './usersPage.module.css';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';

export default function UsersPage() {
  const [users, setUsers] = useState();
  const { searchTerm } = useParams();
  const auth = useAuth();

  const loadUsers = useCallback(async () => {
  const users = await getAll(searchTerm);
  setUsers(users);
}, [searchTerm]);

useEffect(() => {
  loadUsers();
}, [loadUsers]);

  const handleToggleBlock = async userId => {
    const isBlocked = await toggleBlock(userId);

    setUsers(oldUsers =>
      oldUsers.map(user => (user.id === userId ? { ...user, isBlocked } : user))
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Administrar usuarios" />
        <Search
          searchRoute="/admin/users/"
          defaultRoute="/admin/users"
          placeholder="Buscar usuarios"
          margin="1rem 0"
        />
        <div className={classes.list_item}>
          <h3>Nombre</h3>
          <h3>Email</h3>
          <h3>Dirección</h3>
          <h3>Admin</h3>
          <h3>Accciones</h3>
        </div>
        {users &&
          users.map(user => (
            <div key={user.id} className={classes.list_item}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.address}</span>
              <span>{user.isAdmin ? '✅' : '❌'}</span>
              <span className={classes.actions}>
                <Link to={'/admin/editUser/' + user.id}>Editar</Link>
                {auth.user.id !== user.id && (
                  <Link onClick={() => handleToggleBlock(user.id)}>
                    {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                  </Link>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
