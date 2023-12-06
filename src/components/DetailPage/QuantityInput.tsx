interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="Quantity_Main">
      <button onClick={handleDecrement}>-</button>
      <input type="text" value={quantity} readOnly/>
      <button style={{borderRadius: "0px 8px 8px 0px"}} onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityInput;
