const NUMBER = 1000000;

const generateWordId : () => string =
  () => (new Date().getTime().toString());


const randomWord : (listSize: number) => number =
  () => (Math.random() * NUMBER) % listSize;


const daysIntoYear = (date: Date) => {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const updateWordStats = (words: Word[], quizWords: any) => {
  const localWords = JSON.parse(JSON.stringify(words));
  let wordsStats = JSON.parse(JSON.stringify(quizWords));
  wordsStats = wordsStats.filter((word: any) => word.isCorrect);
  localWords.forEach((word: Word) => {
    wordsStats.forEach((correctWord: Word) => {
      if(word.refId === correctWord.refId) {
        word.successRuns += 1
      }
    });
    word.totalRuns += 1
  })

  // compute success rate
  let successRate = localWords.reduce((acc, word : Word) => {
    if(!word.totalRuns) {
      return acc
    }
    acc += word.successRuns / word.totalRuns
    return acc
  }, 0)
  successRate = Math.round(successRate / localWords.length * 100) * 100 / 100;

  return { updatedWords: localWords, successRate }
}

export  { generateWordId, randomWord, daysIntoYear, updateWordStats};
