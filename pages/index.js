import react, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FileReader, JsonNavigator } from './../components';
import { ExampleJson } from './../components/defaults';

const Home = () => {
  const [jsonData, setJsonData] = useState(ExampleJson);

  return (
    <div className={styles.container}>
      <Head>
        <title>Json Visualize</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <JsonNavigator jsonData={jsonData} />
          </div>
          <div className={styles.card}>
            <FileReader onFileRead={setJsonData} />
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
