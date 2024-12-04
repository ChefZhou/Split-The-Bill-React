import Friend from "./Friend";

export default function FriendList({ friends, onSelectFriend }) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}
