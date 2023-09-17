import styles from './Cart.module.css'
import Image from '../../assets/images/placeholder.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Product } from '../../interfaces/Product';
export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>(() => JSON.parse(localStorage.getItem('cart') ?? '[]'))

    const [total, setTotal] = useState<number>(0)

    const increase = (index: number) => {
        const list: any = [...cartItems]
        list[index].quantity++;
        setCartItems(list)
        getTotal(list)
        localStorage.setItem('cart', JSON.stringify(list))
    }
    const decrease = (index: number) => {
        const list = [...cartItems]
        if (list[index].quantity > 1)
            list[index].quantity--;
        setCartItems(list)
        getTotal(list)
        localStorage.setItem('cart', JSON.stringify(list))
    }
    const remove = (index: number) => {
        const list = [...cartItems]
        list.splice(index, 1)
        setCartItems(list)
        getTotal(list)
        localStorage.setItem('cart', JSON.stringify(list))
    }
    const getTotal = (list: Product[]) => {
        let total = 0;
        for (const item of list) {
            total += item.price * item.quantity;

        }
        setTotal(total)
    }
    useEffect(() => {
        getTotal(cartItems)
    }, [cartItems])
    return (
        <div className={styles.container}>
            {
                cartItems?.length > 0 ?
                    <>
                        <div className={styles.itemsContainer} style={{ width: '70%' }}>
                            {
                                cartItems?.map((item: any, index: number) => <div className={styles.item}>
                                    <div>
                                        <FontAwesomeIcon onClick={() => remove(index)} icon={faTrashCan} style={{ color: 'red', }} />
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div>
                                        <h3 >{item.price}$</h3>
                                        <p className={styles.quantity}>{item.quantity}</p>
                                        <div>
                                            <span className={styles.addRemove} onClick={() => increase(index)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </span>
                                            <span className={styles.addRemove} onClick={() => decrease(index)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </span>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>

                        <div className={styles.itemsContainer} style={{ width: '28%', }}>
                            <div className='flex justify-between'>
                                <h3>Total:</h3>
                                <h3>{total}$</h3>
                            </div>
                            <hr />
                            <button type='button' className='btn-primary' style={{ width: '100%' }}>
                                Proceed to Checkout
                            </button>
                        </div>

                    </>

                    : 'cart is empty'
            }
        </div>
    )
}