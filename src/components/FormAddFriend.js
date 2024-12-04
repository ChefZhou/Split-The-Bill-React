import React, { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newFriend = {
        id: crypto.randomUUID(),
        name,
        image: reader.result,
        balance: 0,
      };

      onAddFriend(newFriend);
      setName("");
      setImage(null);
    };
    reader.readAsDataURL(image);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>朋友名稱</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>用戶圖像</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Button>添加朋友</Button>
    </form>
  );
}
