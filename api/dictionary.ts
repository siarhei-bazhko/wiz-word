import { Word } from "../types/Word";

var subscriptionKey = '293ec80286d54ed6acdb36a77837df4e'
var region = 'westeurope'
var baseurl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en'

async function translateText(word: string, language: string) {

  var url = baseurl + "&to=" + language;
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region
      },
      body: JSON.stringify([
        { "Text": word }
      ]),
    });
    let responseJson = await response.json();
    let translation = await responseJson[0]["translations"][0]["text"];
    console.log(translation);
    return translation;
  } catch (error) {
    console.error(error);
  }
}

export default translateText;

