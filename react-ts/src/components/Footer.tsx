import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footer__text}>
                This is a playground App, made with React, with the purpose of
                practice. Developed and designed by{' '}
                <a className="footer__link" href="http://dpenedo.com">
                    dPenedo
                </a>
            </p>
        </footer>
    );
}
