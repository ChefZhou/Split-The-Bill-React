import React, { useState, useEffect } from "react";
import usagiImage from "../img/usagi.jpg";
import hachiwareImage from "../img/hachiware.jpg";
import momoImage from "../img/momo.jpg";
import FormSplitBill from "./FormSplitBill";
import FormAddFriend from "./FormAddFriend";
import FriendList from "./FriendList";
import Button from "./Button";
import CreateUser from "./CreateUser";
import LogIn from "./logIn";

const initialFriends = [
  {
    id: 118836,
    name: "兔兔",
    image: usagiImage,
    balance: -7,
  },
  {
    id: 933372,
    name: "小八",
    image: hachiwareImage,
    balance: 20,
  },
  {
    id: 499476,
    name: "小桃",
    image: momoImage,
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateAcc, setShowCreateAcc] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedShowSidebar = localStorage.getItem("showSidebar");
    const currentUser = localStorage.getItem("currentUser");

    if (storedIsLoggedIn === "true" && currentUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(localStorage.getItem(currentUser));
      setFriends(
        userData.friends.length > 0 ? userData.friends : initialFriends
      );
    }
    if (storedShowSidebar === "true") {
      setShowSidebar(true);
    }

    // 確保在頁面重新整理時隱藏所有表單
    setShowCreateAcc(false);
    setShowLogIn(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const currentUser = localStorage.getItem("currentUser");
      const userData = JSON.parse(localStorage.getItem(currentUser));
      userData.friends = friends;
      try {
        localStorage.setItem(currentUser, JSON.stringify(userData));
      } catch (e) {
        if (e.name === "QuotaExceededError") {
          console.error("LocalStorage quota exceeded. Clearing old data.");
          localStorage.clear(); // 清理舊資料
          localStorage.setItem(currentUser, JSON.stringify(userData));
        }
      }
    }
  }, [friends, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("showSidebar", showSidebar);
  }, [isLoggedIn, showSidebar]);

  const handleAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelectFriend = (friend) => {
    if (selectedFriend && selectedFriend.id === friend.id) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend);
    }
    setShowAddFriend(false);
  };

  const handleToggleAddFriend = () => {
    setShowAddFriend(!showAddFriend);
    setSelectedFriend(null);
  };

  const handleUpdateBalance = (friendId, newBalance) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, balance: newBalance } : friend
      )
    );
    setSelectedFriend(null);
  };

  const handleLogin = () => {
    setShowLogIn(true);
    setShowCreateAcc(false); // 隱藏創建帳號表單
    console.log("Clicked!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSidebar(false);
    setSelectedFriend(null);
    localStorage.removeItem("currentUser"); // 移除當前登入的帳戶
    console.log("Clicked!");
  };

  const handleCreateAccount = () => {
    setShowCreateAcc(true);
    setShowLogIn(false);
    console.log("Clicked!");
  };

  const handleAccountCreated = () => {
    setShowCreateAcc(false);
    alert("帳號創建成功！請回到登入功能。");
  };

  return (
    <div className="app">
      <div className="navbar">
        <h1>分攤費用計算機</h1>
        <ul>
          {isLoggedIn ? (
            <li>
              <a href="#logOut" onClick={handleLogout} className="button-link">
                登出
              </a>
            </li>
          ) : (
            <>
              <li>
                <a href="#logIn" onClick={handleLogin} className="button-link">
                  登入
                </a>
              </li>
              <li>
                <a
                  href="#Create"
                  onClick={handleCreateAccount}
                  className="button-link"
                >
                  創建帳號
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      {showCreateAcc && (
        <div className="createAcc">
          <CreateUser onClose={handleAccountCreated} />
        </div>
      )}
      {showLogIn && (
        <div className="logIn">
          <LogIn
            onClose={() => {
              setShowLogIn(false);
              setIsLoggedIn(true);
              setShowSidebar(true);
              const currentUser = localStorage.getItem("currentUser");
              const userData = JSON.parse(localStorage.getItem(currentUser));
              setFriends(
                userData.friends.length > 0 ? userData.friends : initialFriends
              );
            }}
          />
        </div>
      )}
      <div
        className="sidebar"
        style={{ display: showSidebar ? "block" : "none" }}
      >
        <FriendList friends={friends} onSelectFriend={handleSelectFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleToggleAddFriend}>
          {showAddFriend ? "隱藏" : "新增朋友"}
        </Button>
      </div>
      {selectedFriend && !showAddFriend && (
        <FormSplitBill
          friend={selectedFriend}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}
