import styles from './LoadingSpinner.module.css'
interface props {
    size?: number
}
export default function LoadingSpinner(props: props) {
    return (
        <span className={styles.loader}
            style={{
                width: `${props.size}px` ?? '48px',
                height: `${props.size}px` ?? '48px',
            }}
        ></span>
    )
}