import { Product } from '../../interfaces/Product'
import styles from './ProductCard.module.css'

interface props {
    product: Product
    addToCart(product: any): any
}
export default function ProductCard(props: props) {

    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} shadow`}>
                <img src={props.product.images[0]} style={{ width: '100%' }} />
                <h3>{props.product.title}</h3>
                <p>{props.product.description}</p>
                <button type='button' className='btn-primary' style={{ margin: 10, marginTop: 'auto', marginBottom: 5 }} onClick={() => props.addToCart(props.product)}>Add To Cart {props.product.price}$</button>
            </div>
        </div>
    )
}