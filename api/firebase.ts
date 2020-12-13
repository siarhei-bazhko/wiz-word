import firebase from "../config/firebase";
import { Word } from "../types/Word";

const fs = firebase.firestore();
fs.enablePersistence();

function api(userId: string) {
  async function addFlashcard(flashcard: Word) {
    try {
      console.log("addFlashcard");
      console.log(`users/${userId}/flashcards`);

      await fs.collection("users").doc(userId).collection("flashcards").add(flashcard);
      return { msg: "Word has been added to db!"}
    } catch (err) {
      // TODO: handle
      console.log(err);
      return  Promise.reject({ msg: `Cannot add word ${flashcard} to db :(`})
    }
  }

  async function getFlashcards() {
    const flashcards: any[] = [];
    try {
      console.log(`users/${userId}/flashcards`);
      const snapshot = await fs.collection("users").doc(userId).collection("flashcards").get();
      snapshot.forEach((doc: { data: () => any; }) =>
      {
        flashcards.push(doc.data());
      });
      return flashcards;
    } catch (err) {
      // TODO: handle
      console.log(err)
      return Promise.reject({ msg: "Could not fetch the flashcards from db :("});

    }
  }

  async function deleteFlashcard(id: number) {
    try {
      const flashcardsSnapshot = await fs.collection("users").doc(userId).collection("flashcards").where("id", "==", id).get();
      flashcardsSnapshot.forEach((doc: { ref: { delete: () => any; }; }) =>(doc.ref.delete()));
      return { msg: `Successfully deleted word with id ${id}`}
    } catch (error) {
      // TODO: handle
      console.log(error);
      return  Promise.reject({ msg: "Couldn't delete the word :("})
    }
  }
  return { addFlashcard, getFlashcards, deleteFlashcard };
}

export default api;



