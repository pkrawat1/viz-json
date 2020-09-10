import react, { useState, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FileReader, JsonNavigator } from './../components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setJsonData, setQuery, setMatchPaths } from '../store/actions';

const Home = () => {
  const jsonData = useSelector((state) => state.jsonData);
  const dispatch = useDispatch();
  const onFileRead = useCallback((newJsonData) => {
    dispatch(setJsonData(newJsonData));
    dispatch(setMatchPaths({}));
    dispatch(setQuery(''));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Json Visualize</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <FileReader onFileRead={onFileRead} />
          </div>
          <div className={styles.card}>
            <JsonNavigator jsonData={jsonData} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/pkrawat1'
          target='_blank'
          rel='noopener noreferrer'>
          Built with ❤️ by Pankaj
        </a>
      </footer>
    </div>
  );
};

export default Home;
