import styles from "../Contacts/contacts.module.css";

const Contacts = () => {
    return (
        <section id='contacts' className={styles.section}>
            <div className={styles.container}>
                <h2 className='h2'>Связь</h2>
                <p className={styles.item}>
                    <span>Почта: </span>
                    <a href="mailto:vegretto@gmail.com">vegretto@gmail.com</a>
                </p>

                <p className={styles.item}>
                    <span>Telegram: </span>
                    <a target='_blank' rel="noreferrer" href='https://t.me/yargy'>https://t.me/yargy</a>
                </p>
            </div>
        </section>
    )
}

export default Contacts