import firebaseConfig from '../configs/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth'
import { LoginInput, SignupInput } from '../types/Auth'

const auth = firebaseConfig.auth

const register = (input: SignupInput) => createUserWithEmailAndPassword(auth, input.email, input.password)

const login = (input: LoginInput) => signInWithEmailAndPassword(auth, input.email, input.password)

const logout = () => signOut(auth)

const subscribeToAuthChange = (onChange: (user: User | null) => void) => onAuthStateChanged(auth, onChange)

const AuthService = {
  register,
  login,
  logout,
  subscribeToAuthChange
}

export default AuthService
