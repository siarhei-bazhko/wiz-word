const generateWordId : () => number =
  () => (Math.floor(Math.random() * 1000000));

export default generateWordId;
