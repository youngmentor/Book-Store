import { useEffect, useState } from 'react';
import './DetailPage.css'
import productArray from '../../data'
import { useParams } from 'react-router-dom'
import QuantityInput from './QuantityInput';
import { SelectedProductDetails } from '../interfaces/type.check';
function DetailPage() {
    const { id: productIdParam } = useParams<{ id?: string }>();
    const [productDetails, setProductDetails] = useState<SelectedProductDetails | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (productDetails) {
            // Check if there is enough quantity available in the store
            if (quantity <= productDetails.productQuantity) {
                setProductDetails({
                    ...productDetails,
                    productQuantity: productDetails.productQuantity - quantity,
                });
                setQuantity(1);
                console.log(`Added ${quantity} ${productDetails.productName}(s) to the cart.`);
            } else {
                console.log(`Not enough quantity available in the store.`);
                // You might want to show an error message to the user
            }
        }
    };

    useEffect(() => {
        if (productIdParam) {
            const productId = parseInt(productIdParam, 10);
            const selectedProduct = productArray.find(product => product.id === productId);
            if (selectedProduct) {
                setProductDetails(selectedProduct);
            }
        }
    }, [productIdParam]);

    return (
        <div className='Detail_Main_Page'>
            <div className='Detail_Main_wrap'>
                {productDetails ? (
                    <div className='Detail_Details_Wrap'>
                        <div className='Detail_img_div'>
                            <img src={productDetails.productImage} alt={productDetails.productName} />
                        </div>
                        <div className='Detail_detail_div'>
                            <div className='Details'>
                                <h1>{productDetails.productName}</h1>
                                <p>Author: {productDetails.productAuthor}</p>
                                <p>Category: {productDetails.productsCategory} </p>
                                <p>Price: NGN {productDetails.productPrice}</p>
                                <p>Description: {productDetails.productDescription}</p>
                                <p>
                                    Copy left: {productDetails.productQuantity === 0 ? 'Sold Out' : 'Available: ' + productDetails.productQuantity}
                                </p>
                            </div>
                            <div className='Quantity_action_holder'>
                                <div className='Quantity_holder'>
                                    <QuantityInput quantity={quantity} onQuantityChange={handleQuantityChange} />
                                </div>
                                <p onClick={handleAddToCart}>+ADD TO CART</p>
                                <button className='Buy_now_button'>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='product_not_found'>
                        <p>Product not found</p>
                    </div>
                )}
            </div>
            <div className='You_may_also_like'>
                <h3>You may also like</h3>
            </div>
        </div>
    )
}

export default DetailPage