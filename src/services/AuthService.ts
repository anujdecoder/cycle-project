import firebaseConfig from '../configs/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth'
import { LoginInput, SignupInput } from '../types/Auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { UsersCollection } from '../configs/firestore'

const auth = firebaseConfig.auth
const db = firebaseConfig.db

const register = async (input: SignupInput) => {
  const response = await createUserWithEmailAndPassword(auth, input.email, input.password)
  const user = response.user
  return setDoc(doc(db, UsersCollection, user.uid), {
    id: user.uid,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    isManager: Boolean(input.manager),
    createdOn: serverTimestamp()
  })
}

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
