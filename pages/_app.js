import { Provider } from 'react-redux';
import { useStore } from '../store';
import '../styles/globals.css';
import { ExampleJson } from './../components/defaults';


export default function App({ Component, pageProps }) {
  const store = useStore({jsonData: ExampleJson});

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
