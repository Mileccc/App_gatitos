const CAT_ENDPOINT_RANDOM_FACTS = 'https://catfact.ninja/fact';

export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACTS);
  const data = await res.json();
  const { fact } = data;
  return fact;
};

// export const getRandomFact = () => {
//     return fetch(CAT_ENDPOINT_RANDOM_FACTS)
//       .then(res => res.json())
//       .then(data => {
//         const { fact } = data;
//         return fact;
//       });
//   };
