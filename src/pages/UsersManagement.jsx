// src/pages/UsersManagement.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync, updateUserRoleAsync } from '../redux/userSlice';
import { selectCanPerformAction } from '../redux/permissionSlice';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

const UsersManagementPage = () => {
  const dispatch = useDispatch();
  const { items: users, loading, error } = useSelector(state => state.users);
  const currentRole = useSelector(state => state.auth.user?.role);
  const canManageUsers = useSelector(state => selectCanPerformAction(state, 'manage_users'));
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (canManageUsers) {
      dispatch(fetchUsersAsync());
    } else {
      toast.error('У вас нет прав для просмотра пользователей.');
    }
  }, [dispatch, canManageUsers]);

  const handleRoleUpdate = (userId, newRole) => {
    if (currentRole !== 'OWNER') {
      toast.error('Только владелец может изменять роли.');
      return;
    }
    dispatch(updateUserRoleAsync({ id: userId, role: newRole }))
      .unwrap()
      .then(() => toast.success(`Роль пользователя обновлена на ${newRole}!`))
      .catch(err => toast.error(`Ошибка обновления роли: ${err}`));
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>

      {loading && <p className="text-gray-600">Загрузка пользователей...</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}

      {!loading && !error && (
        <>
          <Table aria-label="Таблица пользователей">
            <TableHeader>
              <TableColumn>Имя</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Роль</TableColumn>
              <TableColumn>Действия</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {currentRole === 'OWNER' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onPress={() => handleRoleUpdate(user.id, 'ADMIN')}
                          disabled={user.role === 'ADMIN'}
                        >
                          Назначить админом
                        </Button>
                        <Button
                          size="sm"
                          onPress={() => handleRoleUpdate(user.id, 'SELLER')}
                          disabled={user.role === 'SELLER'}
                        >
                          Назначить продавцом
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            className="mt-4"
          />
        </>
      )}
    </div>
  );
};

export default UsersManagementPage;