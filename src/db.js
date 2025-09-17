import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4MOqEhnWBD5gGN5oyXNAGP6x79pAmnuQ",
  authDomain: "abor-3bcd8.firebaseapp.com",
  projectId: "abor-3bcd8",
  storageBucket: "abor-3bcd8.firebasestorage.app",
  messagingSenderId: "893294603339",
  appId: "1:893294603339:web:f3c970b62dd1cd4ff031ce",
  measurementId: "G-ZXMHT0E201"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 新規登録
export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// ログイン
export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// プレイヤーデータ取得
export async function getPlayerData(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// プレイヤーデータ保存
export async function savePlayerData(uid, data) {
  const ref = doc(db, "users", uid);
  await setDoc(ref, data);
}