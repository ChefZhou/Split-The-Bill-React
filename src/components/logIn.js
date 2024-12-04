import React, { useState } from "react";
import "../index.css";

export default function LogIn({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        alert("登入成功！");
        localStorage.setItem("currentUser", username); // 記錄當前登入的帳戶
        onClose(); // 關閉表單
      } else {
        alert("密碼錯誤。");
      }
    } else {
      alert("帳號不存在。");
    }
  };

  return (
    <form className="form-log-in" onSubmit={handleLogIn}>
      <h2>登入</h2>
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
        登入
      </button>
    </form>
  );
}
