import { useState, useEffect } from 'react';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/';
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  // Efecto para recuperar la imágen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(' ', 3).join(' ');
    console.log(threeFirstWords);

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { _id } = data;
        console.log(`${CAT_PREFIX_IMAGE_URL}${_id}/says/${threeFirstWords}?fontSize=50&fontColor=white`);
        setImageUrl(`${_id}/says/${threeFirstWords}?fontSize=50&fontColor=white`);
      });
  }, [fact]);
  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` };
}
