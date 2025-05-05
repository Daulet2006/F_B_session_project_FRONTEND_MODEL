import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUserRole } from '../services/apiService';
import { hasPermission } from '../redux/permissionSlice';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination, Button } from '@nextui-org/react';

const UsersManagementPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);
  const currentRole = useSelector(state => state.auth.user?.role);
  
  useEffect(() => {
    if (hasPermission('manage_users')({ auth: { user: { role: currentRole } } })) {
      fetchUsers()
        .then(({ data }) => dispatch({ type: 'user/setUsers', payload: data }))
        .catch(console.error);
    }
  }, [dispatch, currentRole]);

  const handleRoleUpdate = (userId, newRole) => {
    if (currentRole === 'OWNER') {
      updateUserRole(userId, newRole)
        .then(({ data }) => dispatch({ type: 'user/updateUserRole', payload: data }))
        .catch(console.error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>
      <Table aria-label="Таблица пользователей">
      <Pagination total={10} initialPage={1} onChange={(page) => {}} className="mt-4" />
        <TableHeader>
          <TableColumn>Имя</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Роль</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {currentRole === 'OWNER' && (
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleRoleUpdate(user.id, 'ADMIN')}>
                      Назначить админом
                    </Button>
                    <Button size="sm" onPress={() => handleRoleUpdate(user.id, 'SELLER')}>
                      Назначить продавцом
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersManagementPage;