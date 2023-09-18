import ProductCard from '../components/ProductCard/ProductCard';
import { useEffect, useState } from "react";
import { Product } from '../interfaces/Product';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import styles from './Home.module.css'

interface props {
    addToCart: (product: Product) => void
}
export default function Home(props: props) {
    const API_URL = 'https://api.escuelajs.co/api/v1/products'
    const [productsList, setProducts] = useState<Product[]>([]);
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(true)




    const fetchProducts = async (url: string) => {
        try {
            const result = await fetch(url)
            if (result.ok) {
                const data = await result.json()
                setProducts(() => data.slice(0, 5))
                setLoading(false)
            } else {
                setIsError(true)
                setLoading(false)
            }
        } catch (error) {
            setIsError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(API_URL)
    }, [])
    return (
        <div className='container flex flex-wrap'>
            {
                loading ?
                    <div className={styles.loadingContainer}>
                        <LoadingSpinner size={75} />
                    </div>
                    : productsList.map((item) => <ProductCard product={item} addToCart={props.addToCart} />)
            }
        </div>
    )
}