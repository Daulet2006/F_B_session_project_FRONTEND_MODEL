// src/pages/Vets.jsx
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVetsThunk } from '../redux/vetSlice';
import { fetchAnimalsThunk, deleteAnimalAsync, addAnimalAsync, updateAnimalAsync } from '../redux/animalSlice';
import { toast } from 'react-toastify';

export default function Vets() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { items: vets, loading: vetsLoading, error: vetsError } = useSelector((state) => state.vets);
  const { items: animals, loading: animalsLoading, error: animalsError } = useSelector((state) => state.animals);

  const [newAnimal, setNewAnimal] = useState({ name: '', type: '', vetId: '', image: '' });
  const [editAnimal, setEditAnimal] = useState(null);

  useEffect(() => {
    dispatch(fetchVetsThunk());
    dispatch(fetchAnimalsThunk());
  }, [dispatch]);

  const handleDeleteAnimal = useCallback(
    (id) => {
      if (role !== 'vet') {
        toast.error('У вас нет прав на удаление животного');
        return;
      }
      if (window.confirm('Удалить животное?')) {
        dispatch(deleteAnimalAsync(id))
          .unwrap()
          .then(() => toast.success('Животное успешно удалено!'))
          .catch((err) => toast.error(`Ошибка удаления: ${err}`));
      }
    },
    [dispatch, role]
  );

  const handleAddAnimal = useCallback(() => {
    if (role !== 'vet') {
      toast.error('У вас нет прав на добавление животного');
      return;
    }

    const { name, type, vetId, image } = newAnimal;
    if (!name || !type || !vetId) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    dispatch(addAnimalAsync({ name, type, vetId, image }))
      .unwrap()
      .then(() => {
        setNewAnimal({ name: '', type: '', vetId: '', image: '' });
        toast.success('Животное успешно добавлено!');
      })
      .catch((err) => toast.error(`Ошибка добавления: ${err}`));
  }, [newAnimal, dispatch, role]);

  const handleUpdateAnimal = useCallback(() => {
    if (role !== 'vet') {
      toast.error('У вас нет прав на редактирование животного');
      return;
    }

    dispatch(updateAnimalAsync({ id: editAnimal.id, name: editAnimal.name, type: editAnimal.type, vetId: editAnimal.vetId, image: editAnimal.image }))
      .unwrap()
      .then(() => {
        setEditAnimal(null);
        toast.success('Животное успешно обновлено!');
      })
      .catch((err) => toast.error(`Ошибка обновления: ${err}`));
  }, [editAnimal, dispatch, role]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Наши ветеринары</h1>

      {vetsLoading && <p className="text-gray-600">Загрузка ветеринаров...</p>}
      {vetsError && <p className="text-red-500">Ошибка: {vetsError}</p>}

      {animalsLoading && <p className="text-gray-600">Загрузка животных...</p>}
      {animalsError && <p className="text-red-500">Ошибка: {animalsError}</p>}

      {!vetsLoading && !vetsError && !animalsLoading && !animalsError && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {vets.map((vet) => (
              <div key={vet.id} className="bg-white p-6 rounded-2xl shadow-lg border">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{vet.name}</h2>
                <p className="text-gray-600 mb-4">Специализация: {vet.specialty}</p>
                <h3 className="font-semibold mb-2">Пациенты:</h3>
                {animals.filter((a) => a.vetId === vet.id).map((animal) => (
                  <div key={animal.id} className="bg-gray-50 p-3 rounded-lg mb-2">
                    {animal.image && (
                      <img src={animal.image} alt={animal.name} className="w-16 h-16 rounded-lg mb-2" />
                    )}
                    <p className="font-medium">{animal.name}</p>
                    <p className="text-sm text-gray-600">Вид: {animal.type}</p>
                    {role === 'vet' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                          onClick={() => setEditAnimal(animal)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                          onClick={() => handleDeleteAnimal(animal.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {animals.filter((a) => a.vetId === vet.id).length === 0 && (
                  <p className="text-sm text-gray-400">Нет животных</p>
                )}
              </div>
            ))}
          </div>

          {role === 'vet' && (
            <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg border">
              <h2 className="text-2xl font-bold mb-4">Добавить животное</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Имя"
                  value={newAnimal.name}
                  onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Тип"
                  value={newAnimal.type}
                  onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
                  className="p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="URL изображения"
                  value={newAnimal.image}
                  onChange={(e) => setNewAnimal({ ...newAnimal, image: e.target.value })}
                  className="p-3 border rounded"
                />
                <select
                  value={newAnimal.vetId}
                  onChange={(e) => setNewAnimal({ ...newAnimal, vetId: e.target.value })}
                  className="p-3 border rounded"
                >
                  <option value="">Выберите ветеринара</option>
                  {vets.map((vet) => (
                    <option key={vet.id} value={vet.id}>
                      {vet.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                onClick={handleAddAnimal}
              >
                Добавить
              </button>
            </div>
          )}

          {editAnimal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white p-6 rounded-2xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Редактировать животное</h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editAnimal.name}
                    onChange={(e) => setEditAnimal({ ...editAnimal, name: e.target.value })}
                    className="p-3 border rounded w-full"
                    placeholder="Имя"
                  />
                  <input
                    type="text"
                    value={editAnimal.type}
                    onChange={(e) => setEditAnimal({ ...editAnimal, type: e.target.value })}
                    className="p-3 border rounded w-full"
                    placeholder="Тип"
                  />
                  <input
                    type="text"
                    value={editAnimal.image || ''}
                    onChange={(e) => setEditAnimal({ ...editAnimal, image: e.target.value })}
                    className="p-3 border rounded w-full"
                    placeholder="URL изображения"
                  />
                  <select
                    value={editAnimal.vetId}
                    onChange={(e) => setEditAnimal({ ...editAnimal, vetId: e.target.value })}
                    className="p-3 border rounded w-full"
                  >
                    {vets.map((vet) => (
                      <option key={vet.id} value={vet.id}>
                        {vet.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleUpdateAnimal}
                      className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setEditAnimal(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}