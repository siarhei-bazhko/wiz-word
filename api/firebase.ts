import firebase from "../config/firebase";
import { Word } from "../types/Word";

const fs = firebase.firestore();

async function addFlashcard(flashcard: Word) {
  try {
    await fs.collection("flashcards").add(flashcard);
    return { msg: "Word has been added to db!"}
  } catch (err) {
    // TODO: handle
    console.log(err);
    return { msg: `Cannot add word ${flashcard} to db :(`}
  }
}

async function getFlashcards() {
  const flashcards: any[] = [];
  try {
    const snapshot = await fs.collection("flashcards").get();
    snapshot.forEach((doc: { data: () => any; }) =>(flashcards.push(doc.data())));
    return flashcards;
  } catch (err) {
    // TODO: handle
    console.log(err)
    return { msg: "Could not fetch the flashcards from db :("}
  }
}

async function deleteFlashcard(id: number) {
  try {
    const flashcardsSnapshot = await fs.collection("flashcards").where("id", "==", id).get();
    flashcardsSnapshot.forEach((doc: { ref: { delete: () => any; }; }) =>(doc.ref.delete()));
    return { msg: `Successfully deleted word with id ${id}`}
  } catch (error) {
    // TODO: handle
    console.log(error);
    return { msg: "Couldn't delete the word :("}
  }
}

export { addFlashcard, getFlashcards, deleteFlashcard };



