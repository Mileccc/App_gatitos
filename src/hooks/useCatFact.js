import { useState, useEffect } from 'react';
import { getRandomFact } from '../service/fact';

export function useCatFact () {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact));
  };
  useEffect(refreshFact, []);

  return { fact, refreshFact };
};
