// import { openDB } from 'idb';

// const DB_NAME = 'quizDB';
// const STORE_NAME = 'answers';

// export const initDB = async () => {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, {
//           keyPath: 'id',
//           autoIncrement: true,
//         });
//       }
//     },
//   });
// };

// export const saveAnswer = async (answer) => {
//   const db = await initDB();
//   const tx = db.transaction(STORE_NAME, 'readwrite');
//   const store = tx.objectStore(STORE_NAME);
//   await store.put(answer);
//   await tx.done;
// };

// export const getAnswers = async () => {
//   const db = await initDB();
//   const tx = db.transaction(STORE_NAME, 'readonly');
//   const store = tx.objectStore(STORE_NAME);
//   return await store.getAll();
// };

// export const clearAnswers = async () => {
//   const db = await initDB();
//   const tx = db.transaction(STORE_NAME, 'readwrite');
//   const store = tx.objectStore(STORE_NAME);
//   await store.clear();
//   await tx.done;
// };
