import styles from './Cart.module.css'
import Image from '../../assets/images/placeholder.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Product } from '../../interfaces/Product';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

interface props {
    emptyCart: () => void
    remove: (index: number) => void
    getTotal: (list: Product[]) => void
    total: number
}
export default function Cart(props: props) {
    const [cartItems, setCartItems] = useState<Product[]>(() => JSON.parse(localStorage.getItem('cart') ?? '[]'))

    // const [total, setTotal] = useState<number>(0)
    const [purchaseStatus, setPurchaseStatus] = useState<'loading' | 'success' | 'error'>();


    const increase = (index: number) => {
        const list: any = [...cartItems]
        list[index].quantity++;
        setCartItems(list)
        props.getTotal(list)
        localStorage.setItem('cart', JSON.stringify(list))
    }
    const decrease = (index: number) => {
        const list = [...cartItems]
        if (list[index].quantity > 1)
            list[index].quantity--;
        setCartItems(list)
        props.getTotal(list)
        localStorage.setItem('cart', JSON.stringify(list))
    }
    // const remove = (index: number) => {
    //     const list = [...cartItems]
    //     list.splice(index, 1)
    //     setCartItems(list)
    //     getTotal(list)
    //     localStorage.setItem('cart', JSON.stringify(list))
    // }



    // const getTotal = (list: Product[]) => {
    //     let total = 0;
    //     for (const item of list) {
    //         total += item.price * item.quantity;

    //     }
    //     setTotal(total)
    // }
    const proceedPurchase = async (cart: Product[]) => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }


    const handleProceedPurchases = async () => {
        try {
            setPurchaseStatus('loading')
            const status = await proceedPurchase(cartItems)
            console.log(status, 'purchase status')
            if (status) {
                setCartItems([])
                props.emptyCart()
                setPurchaseStatus('success')
            } else {
                setPurchaseStatus('error')
            }
        } catch (err) {
            console.error('Purchase error:', err);
            setPurchaseStatus('error')
        }

    }
    useEffect(() => {
        props.getTotal(cartItems)
    }, [cartItems])
    return (
        <>{
            purchaseStatus === 'success' ?

                <div className={styles.message}>
                    your purchase has been successfully completed
                </div>
                :
                <div className={styles.container}>
                    {
                        cartItems?.length > 0 ?
                            <>
                                <div className={styles.itemsContainer}>
                                    {
                                        cartItems?.map((item: any, index: number) => <div className={styles.item}>
                                            <div>
                                                <FontAwesomeIcon onClick={() => props.remove(index)} icon={faTrashCan} style={{ color: 'red', }} />
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

                                <div className={styles.totalContainer}>
                                    <div className='flex justify-between'>
                                        <h3>Total:</h3>
                                        <h3>{props.total}$</h3>
                                    </div>
                                    <hr />
                                    <button type='button' className='btn-primary' style={{ width: '100%' }} onClick={() => handleProceedPurchases()}>
                                        {purchaseStatus === 'loading' ? <LoadingSpinner size={25} /> : 'Proceed to checout'}
                                    </button>
                                </div>

                            </>

                            : 'cart is empty'
                    }
                </div>
        }
        </>
    )
}