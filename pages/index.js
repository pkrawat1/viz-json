import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href='javascript:void(0)'>JSONPath Visualizer</a>
        </h1>

        <p className={styles.description}>
          Get started by uploading a {'  '}
          <code className={styles.code}>json</code> file
        </p>

        <div className={styles.grid}>
          <a href='javascript:void(0)' className={styles.card}>
            <h3>Navigation Tree</h3>
          </a>

          <a href='javascript:void(0)' className={styles.card}>
            <h3>File Uploader &rarr;</h3>
            <p>Select a json file to visualize on the left panel.</p>
          </a>
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
}
