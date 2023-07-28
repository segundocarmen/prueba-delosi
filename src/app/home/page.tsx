"use client"
import { useAppData } from '@/context';
import styles from '../page.module.scss';
import { Languaje } from '../../config/languaje';

const Home = () => {
    const {lang} = useAppData();
    const key = lang;
    const {
        [key as keyof typeof Languaje]: {
            home: { title, description }
        }
    } = Languaje;

    return(
        <section className={styles.home} >
            <h1 className='title'>{title}</h1>
            <p className='description'>{description}</p>
        </section>
    )
}

export default Home;