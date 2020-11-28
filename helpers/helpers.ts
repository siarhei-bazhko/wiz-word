const NUMBER = 1000000;

const generateWordId : () => number =
  () => (Math.floor(Math.random() * NUMBER));


const randomWord : (listSize: number) => number =
  () => (Math.random() * NUMBER) % listSize;

export  { generateWordId, randomWord };
