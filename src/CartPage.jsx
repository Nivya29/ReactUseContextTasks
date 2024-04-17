import { useCart } from './CartContext';

function CartPage() {
    const { cartItems, totalQuantity, totalAmount, addOrUpdateItem, removeItem } = useCart();

    // Function to handle payment
    const handlePayment = () => {
        alert('Proceeding to payment...');
        // Add your payment processing logic here
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(cartItem => (
                        <div
                            key={cartItem.id}
                            style={{
                                display: 'flex',
                                margin: '20px', // Equal margin around each box
                                border: '1px solid #ccc',
                                padding: '20px',
                                borderRadius: '5px',
                                width: '90%', // Make each box fill the entire page width
                                boxSizing: 'border-box' // Account for padding and border in width
                            }}
                        >
                            {/* Image on the left */}
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={cartItem.thumbnail}
                                    alt={cartItem.title}
                                    style={{
                                        width: '300px',
                                        height: '400px', // Adjust height as needed
                                        objectFit: 'contain',
                                        marginRight: '20px' 
                                    }}
                                />
                            </div>
                            {/* Content (details) on the right */}
                            <div style={{ flex: 2, paddingLeft: '20px' }}>
                                <h2 style={{ textAlign: 'left' }}>{cartItem.title}</h2>
                                <p style={{ textAlign: 'left' }}><strong>Price:</strong> ${cartItem.price.toFixed(2)}</p>
                                <p style={{ textAlign: 'left' }}><strong>Description:</strong> {cartItem.description}</p>
                                <p style={{ textAlign: 'left' }}><strong>Discount Percentage:</strong> {cartItem.discountPercentage}%</p>
                                <p style={{ textAlign: 'left' }}><strong>Rating:</strong> {cartItem.rating}</p>
                                <p style={{ textAlign: 'left' }}><strong>In Stock:</strong> {cartItem.stock}</p>
                                <p style={{ textAlign: 'left' }}><strong>Brand:</strong> {cartItem.brand}</p>
                                <p style={{ textAlign: 'left' }}><strong>Quantity:</strong>
                                    <button onClick={() => addOrUpdateItem(cartItem, cartItem.quantity - 1)}>-</button>
                                    {cartItem.quantity}
                                    <button onClick={() => addOrUpdateItem(cartItem, cartItem.quantity + 1)}>+</button>
                                </p>
                                <div style={{ textAlign: 'left' }}>
                                    <button
                                        onClick={() => removeItem(cartItem.id)}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'red',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginBottom: '10px', // Add margin for spacing
                                        }}
                                    >
                                        Remove
                                    </button>
                                    </div>
                                {/* Calculate total cost for this cart item */}
                                <p style={{ textAlign: 'left' }}><strong>Total:</strong> ${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Wrap total quantity and total price in one box */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between', // Space between total quantity and total price
                    alignItems: 'center', // Align items vertically
                    border: '1px solid #ccc',
                    padding: '20px',
                    marginTop: '20px',
                    width: '90%', // Box takes up full page width
                    boxSizing: 'border-box', // Account for padding and border in width
                    borderRadius: '5px',
                    marginLeft: '20px',
                    marginBottom:'10px'
                    
                }}
            >
                {/* Total quantity on the left */}
                <h3>Total Quantity: {totalQuantity}</h3>
                {/* Total amount on the right */}
                <div style={{ textAlign: 'right' }}>
                    <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                    {/* Button to proceed to payment below total price */}
                    <button onClick={handlePayment} style={{ marginTop: '10px',backgroundColor:'lightblue' }}>
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
