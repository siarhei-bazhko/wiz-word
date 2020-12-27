const NUMBER = 1000000;

const generateWordId : () => string =
  () => (new Date().getTime().toString());


const randomWord : (listSize: number) => number =
  () => (Math.random() * NUMBER) % listSize;


const daysIntoYear = (date: Date) => {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export  { generateWordId, randomWord, daysIntoYear};
