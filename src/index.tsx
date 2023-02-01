import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './components/App/index.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);
