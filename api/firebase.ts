import { auth } from "firebase";
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

  async function syncOfflineWithServer(addedArray:Word[], deletedArray, updatedWords) {
    try {
      const batch = fs.batch();
      updatedWords.forEach(word => {
      const ref = fs.collection("users").doc(userId).collection("flashcards").doc(word.refId);
      batch.update(ref, word)
      })
      deletedArray.forEach(id => {
        const ref = fs.collection("users").doc(userId).collection("flashcards").doc(id)
        batch.delete(ref);
      });

      addedArray.forEach(doc => {

      const ref = fs.collection("users").doc(userId).collection("flashcards").doc();
      batch.set(ref, doc)
      })


      const res = await batch.commit();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStats(updatedWords) {
    try {
      const batch = fs.batch();
      updatedWords.forEach(word => {
      const ref = fs.collection("users").doc(userId).collection("flashcards").doc(word.refId);
      batch.update(ref, word)
      })
      await batch.commit()
    } catch(err) {
      console.log(err);
    }
  }

  async function  deleteAllFlashcards() {
    try {
      const flashcardsSnapshot = await fs.collection("users").doc(userId).collection("flashcards");
      console.log(flashcardsSnapshot);
      const query = flashcardsSnapshot.orderBy('origin').limit(3);

      return new Promise((resolve, reject) => {
        deleteWordsBatch(fs, query, resolve).catch(reject);
      });
    } catch (error) {
      // TODO: handle
      console.log(error);
      return  Promise.reject({ msg: "Couldn't delete the words :("})
    }
  }

  async function deleteWordsBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return { msg: `Successfully deleted all flashcards`}
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      console.log(doc.ref);
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteWordsBatch(db, query, resolve);
    });
  }

  async function deleteStats(words) {
    try {
      const batch = fs.batch();
      words.forEach(word => {
      const ref = fs.collection("users").doc(userId).collection("flashcards").doc(word.refId);
      word.successRuns = 0;
      word.totalRuns = 0;
      batch.update(ref, word)
      })
      await batch.commit()
      return words
    } catch(err) {
      console.log(err);
    }
  }

  return { addFlashcard, getFlashcards, deleteFlashcard, syncOfflineWithServer, updateStats, deleteAllFlashcards, deleteStats };
}

export default api;

export {
  fs
}


