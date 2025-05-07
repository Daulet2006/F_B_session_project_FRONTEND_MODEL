// src/components/chat/Chat.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatHistory, sendMessage } from "../../redux/slices/chatSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message && !file) return;
    dispatch(sendMessage({ message, file })).then(() => {
      setMessage("");
      setFile(null);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>}
      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50 rounded">
        {loading ? (
          <div>Loading chat history...</div>
        ) : (
          history.map((msg) => (
            <div key={msg.id} className="mb-3">
              <div className="font-semibold text-emerald-700">{user?.name || "User"} <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</span></div>
              <div className="text-gray-800">{msg.message}</div>
              {msg.file && (
                <a
                  href={`/chat/files/${msg.file.name}`}
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download: {msg.file.name}
                </a>
              )}
              {msg.reply && (
                <div className="mt-1 text-emerald-600">AI: {msg.reply}</div>
              )}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSend} className="flex flex-col gap-2">
        <textarea
          className="form-input resize-none"
          rows={2}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} accept=".txt,.pdf,.png,.jpg,.jpeg,.gif,.doc,.docx" />
        <button
          type="submit"
          className="btn btn-primary self-end"
          disabled={loading || (!message && !file)}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;