import BalanceMessage from "./BalanceMessage";

export default function Friend({ friend, onSelectFriend }) {
  return (
    <li className="friend" onClick={() => onSelectFriend(friend)}>
      <img src={friend.image} alt={friend.name} />
      <div>{friend.name}</div>
      <div>{friend.balance}</div>
      <BalanceMessage name={friend.name} balance={friend.balance} />
    </li>
  );
}
