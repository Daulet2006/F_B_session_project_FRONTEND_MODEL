// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistoryThunk, sendMessageThunk } from '../redux/chatSlice';
import { get } from '../services/apiService';
import { FiSend, FiPaperclip, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Chat = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, sendingMessage } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChatHistoryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() || selectedFile) {
      dispatch(sendMessageThunk({ message: newMessage, file: selectedFile }))
        .unwrap()
        .then(() => {
          setNewMessage('');
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        })
        .catch((error) => {
          toast.error(`Ошибка при отправке сообщения: ${error}`);
        });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadFile = async (filePath, fileName) => {
    try {
      const fileUrl = `/chat/files/${filePath.split('/').pop()}`;
      const response = await get(fileUrl, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(`Ошибка при скачивании файла: ${error}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Чат с консультантом</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>У вас пока нет сообщений.</p>
            <p>Напишите нам, и мы с радостью поможем!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-xs md:max-w-md">
                    <p>{msg.message}</p>
                    {msg.file && (
                      <div className="mt-2 flex items-center text-blue-600 hover:text-blue-800">
                        <FiPaperclip className="mr-1" />
                        <button 
                          onClick={() => downloadFile(msg.file.path, msg.file.name)}
                          className="flex items-center text-sm"
                        >
                          {msg.file.name} <FiDownload className="ml-1" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-right mt-1 text-gray-500">{formatDate(msg.timestamp)}</p>
                  </div>
                </div>
                
                {msg.reply && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p>{msg.reply}</p>
                      <p className="text-xs text-right mt-1 text-gray-500">{formatDate(msg.timestamp)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите ваше сообщение..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sendingMessage}
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            disabled={sendingMessage}
          >
            <FiPaperclip className="text-gray-600" />
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none flex items-center justify-center"
            disabled={sendingMessage || (!newMessage.trim() && !selectedFile)}
          >
            {sendingMessage ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <FiSend />
            )}
          </button>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {selectedFile && (
          <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
            <div className="flex items-center">
              <FiPaperclip className="mr-2 text-gray-600" />
              <span className="text-sm truncate">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Chat;