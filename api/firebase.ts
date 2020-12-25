import firebase from "../config/firebase";
import { Word } from "../types/Word";

const fs = firebase.firestore();
// fs.enablePersistence();

function api(userId: string) {
  async function addFlashcard(flashcard: Word) {
    try {
      console.log("addFlashcard");
      console.log(`users/${userId}/flashcards`);

      const docRef = await fs.collection("users").doc(userId).collection("flashcards").add(flashcard);
      return { id: docRef.id, msg: "Word has been added to db!"}
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
      snapshot.forEach((doc) => {
        flashcards.push({ ...doc.data(), refId: doc.id});
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
      const flashcardsSnapshot = await fs.collection("users").doc(userId).collection("flashcards")
      .doc(id).delete();
      return { msg: `Successfully deleted word with id ${id}: ${flashcardsSnapshot}`}
    } catch (error) {
      // TODO: handle
      console.log(error);
      return  Promise.reject({ msg: "Couldn't delete the word :("})
    }
  }

  async function syncOfflineWithServer(addedArray:Word[], deletedArray) {
    try {
      const batch = fs.batch();
      console.log(JSON.stringify(deletedArray));
      console.log(JSON.stringify(addedArray));

      deletedArray.forEach(id => {
        const ref = fs.collection("users").doc(userId).collection("flashcards").doc(id)
        batch.delete(ref);
      });

      console.log("longgg");

      addedArray.forEach(doc => {
      console.log("doc2");

      const ref = fs.collection("users").doc(userId).collection("flashcards").doc();
      batch.set(ref, doc)
      })
      const res = await batch.commit();
      console.log("OK:" + res);

    } catch (err) {
      console.log(err);
    }
  }

  return { addFlashcard, getFlashcards, deleteFlashcard, syncOfflineWithServer };
}

export default api;

export {
  fs
}


