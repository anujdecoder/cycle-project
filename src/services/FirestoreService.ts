import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  WhereFilterOp
} from 'firebase/firestore'
import firebaseConfig from '../configs/firebase'

const firestore = firebaseConfig.firestore

interface SetDocumentInput {
  collection: string
  document: any
  id: string
}
const setDocument = (input: SetDocumentInput) => {
  return setDoc(doc(firestore, input.collection, input.id), {
    ...input.document,
    createdAt: serverTimestamp()
  })
}

interface CreateDocumentInput {
  collection: string
  document: any
}
const createDocument = (input: CreateDocumentInput) => {
  return addDoc(collection(firestore, input.collection), {
    ...input.document,
    createdAt: serverTimestamp()
  })
}

interface UpdateDocumentInput {
  collection: string
  document: any
  id: string
}
const updateDocument = (input: UpdateDocumentInput) => {
  return updateDoc(doc(firestore, input.collection, input.id), input.document)
}

const deleteDocument = (collection: string, id: string) => {
  return deleteDoc(doc(firestore, collection, id))
}

const readDocument = (collection: string, id: string) => {
  return getDoc(doc(firestore, collection, id))
}

interface ReadDocumentsVariables {
  collectionName: string
  queries: {
    field: any
    condition: WhereFilterOp
    value: unknown
  }[]
  orderByField?: string
  orderByDirection?: OrderByDirection
  pageSize?: number
  cursorId?: string
}
const readDocuments = async ({
  collectionName,
  queries,
  orderByField,
  orderByDirection,
  pageSize,
  cursorId
}: ReadDocumentsVariables) => {
  const queryConstraints: QueryConstraint[] = []

  queries.forEach(({ field, condition, value }) => {
    queryConstraints.push(where(field, condition, value))
  })

  if (orderByField) {
    queryConstraints.push(orderBy(orderByField, orderByDirection))
  }

  if (pageSize) {
    queryConstraints.push(limit(pageSize))
  }

  if (cursorId) {
    const cursor = await readDocument(collectionName, cursorId)
    queryConstraints.push(startAfter(cursor))
  }

  const queryRef = query(collection(firestore, collectionName), ...queryConstraints)
  return getDocs(queryRef)
}

const FirestoreService = {
  setDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  readDocument,
  readDocuments
}

export default FirestoreService
