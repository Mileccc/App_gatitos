import './App.css';
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
import { Otro } from './Component/Otro.jsx';

export function App () {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img
        src={imageUrl}
        alt={`Image extracted using the first three words for ${fact}`}
                   />}

      <Otro />
    </main>
  );
}
