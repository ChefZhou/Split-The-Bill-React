export default function BalanceMessage({ name, balance }) {
  if (balance === 0) return null;

  const message =
    balance < 0
      ? `你還欠${name} ${Math.abs(balance)}元`
      : `${name} 還欠你 ${balance}元`;

  const className = balance < 0 ? "red" : "green";

  return <p className={className}>{message}</p>;
}
