import './AllProduct.css'
import productArray from '../../data'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCart } from '../../contextApi/CartContext';
import { SelectedProductDetails } from '../interfaces/type.check';
import { CartItem } from '../interfaces/type.check';
function AllProduct() {
    const { dispatch } = useCart()
    const navigate = useNavigate()
    // const [displayedProducts, setDisplayedProducts] = useState(8);
    const [animatedCardId, setAnimatedCardId] = useState<number | null>(null);
    // const handleLoadMore = () => {
    //     setDisplayedProducts(displayedProducts + 8);
    // };
    const handleAddItem = (product: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setAnimatedCardId(product.id);
        // Reset animation state after a delay (1s, should match the animation duration)
    };
    useEffect(() => {
        const resetAnimation = setTimeout(() => {
            setAnimatedCardId(null);
        }, 1000);

        return () => clearTimeout(resetAnimation);
    }, [animatedCardId]);

    return (
        <div className='AllProduct_main'>
            <h3>Popular picks in Book store</h3>
            <div className='AllProduct_main_wrap'>
                {productArray.slice(0, 8).map((i: SelectedProductDetails) => (
                    <div key={i.id}
                        className={`Allproduct_Card ${animatedCardId === i.id ? 'fly-animation' : ''}`}
                    >
                        <div className='AllproductImage_div'>
                            <img src={i.productImage} alt={i.productName} />
                        </div>
                        <div className='AllProduct_details' onClick={() => navigate(`detail/${i.id}`)}>
                            <p className='ProducT_name'>{i.productName}</p>
                            <p className='Product_price'>NGN {i.productPrice}</p>
                        </div>
                        <div className='AddToCartPage' >
                            <p onClick={() => handleAddItem(i)}>+Add to cart</p>
                        </div>
                    </div>
                ))}

            </div>
            {/* {productArray.length > displayedProducts && (
                <button onClick={handleLoadMore} className='Load_more_button'>Load More</button>
            )} */}
        </div>
    )
}

export default AllProduct