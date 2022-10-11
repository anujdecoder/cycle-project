import firebaseConfig from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

const auth = firebaseConfig.auth;

const signup = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const logout = () => signOut(auth);

const subscribeToAuthChange = (onChange: (user: User | null) => void) =>
  onAuthStateChanged(auth, onChange);

const AuthService = {
  signup,
  login,
  logout,
  subscribeToAuthChange,
};

export default AuthService;
