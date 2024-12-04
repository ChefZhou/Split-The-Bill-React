import { useState, useEffect } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, onUpdateBalance }) {
  const [amount, setAmount] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [payer, setPayer] = useState("");
  const [currentBalance, setCurrentBalance] = useState(friend.balance);

  useEffect(() => {
    setAmount("");
    setYourExpense("");
    setPayer("");
    setCurrentBalance(friend.balance);
  }, [friend]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !yourExpense || !payer) return;

    const friendExpense = amount - yourExpense;
    const newBalance =
      payer === "you"
        ? currentBalance + friendExpense
        : currentBalance - yourExpense;

    onUpdateBalance(friend.id, newBalance);
    setCurrentBalance(newBalance);

    console.log("拆帳:", { amount, yourExpense, friendExpense, payer });

    setAmount("");
    setYourExpense("");
    setPayer("");
  };

  const handleYourExpenseChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value <= parseFloat(amount)) {
      setYourExpense(value);
    }
  };

  const balanceMessage =
    currentBalance < 0
      ? `你還欠${friend.name} ${Math.abs(currentBalance)}元`
      : `${friend.name} 還欠你 ${currentBalance}元`;

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>{balanceMessage}</h2>

      <label>金額</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>你的花費</label>
      <input
        type="number"
        value={yourExpense}
        onChange={handleYourExpenseChange}
      />

      <label>朋友的花費</label>
      <input type="number" disabled value={amount - yourExpense} />

      <label>誰付帳的</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="">選擇誰付帳</option>
        <option value="you">你</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>拆帳</Button>
    </form>
  );
}
