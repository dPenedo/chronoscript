import styles from './button.module.css'
interface ButtonProps {
    children: string;
    onClick?: () => void;
}

export default function Button({children, onClick}: ButtonProps) {
    return (
                <button className={styles.button} onClick={onClick}>{children}</button>
    )
}
