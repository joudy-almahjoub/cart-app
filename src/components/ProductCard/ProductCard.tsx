import { useEffect, useState } from 'react'
import { Product } from '../../interfaces/Product'
import styles from './ProductCard.module.css'

interface props {
    product: Product
    addToCart(product: any): any
}
export default function ProductCard(props: props) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const [status, setStatus] = useState('normal')



    useEffect(() => {
        const foundInCart = cart.find((item: any) => item.id === props.product.id)
        if (foundInCart) {
            setStatus('added')
        } else {
            const purchase = JSON.parse(localStorage.getItem('purchase') || '[]')
            const foundInPurchase = purchase.find((item: any) => item.id === props.product.id)
            if (foundInPurchase) {
                setStatus('bought')
            } else {
                setStatus('normal')
            }
        }
    }, [cart])
    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} shadow`}>
                <img src={props.product.images[0]} style={{ width: '100%' }} />
                <h3>{props.product.title}</h3>
                <h5>{status}</h5>
                <p>{props.product.description}</p>
                <button type='button' className='btn-primary' style={{ margin: 10, marginTop: 'auto', marginBottom: 5, cursor: 'pointer' }} onClick={() => props.addToCart(props.product)}>Add To Cart {props.product.price}$</button>
            </div>
        </div>
    )
}