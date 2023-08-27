import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={[styles.loader, styles.loader_1].join(" ")}>
                <div className={styles.loader_outter}></div>
            </div>
        </div>
    );
};
