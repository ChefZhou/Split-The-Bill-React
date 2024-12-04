import React, { useState } from "react";
import "../index.css";

export default function CreateUser({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (username && password) {
      const userData = {
        password,
        friends: [], // 初始化朋友列表
      };
      localStorage.setItem(username, JSON.stringify(userData));
      alert("帳號創建成功！");

      setUsername("");
      setPassword("");
      onClose();
    } else {
      alert("請輸入帳號和密碼。");
    }
  };

  return (
    <form className="form-create-acc" onSubmit={handleCreateAccount}>
      <h2>新增帳號</h2>
      <label>帳號：</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>密碼：</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" type="submit">
        建立帳號
      </button>
    </form>
  );
}
