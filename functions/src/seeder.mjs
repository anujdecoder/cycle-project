import { initializeApp } from "firebase/app";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { faker } from "@faker-js/faker";
import seederConfig from "./seederConfig.mjs";

export const SEED_KEY = 'c49fd22c-05f9-40a0-b1ac-525803af7875'
const USERS_COLLECTION = 'users'

const app = initializeApp(seederConfig)
const firestore = getFirestore(app)
const functions = getFunctions(app)

const seedUser = async user => {
  try {
    const createUser = httpsCallable(functions, 'createUser')
    const res = await createUser({
      ...user,
      password: 'Pass@123',
      seedKey: SEED_KEY,
    })

    await setDoc(doc(firestore, USERS_COLLECTION, res.data + ''), {
      ...user,
      createdAt: serverTimestamp(),
      id: res.data + '',
      uid: res.data + '',
    })

    console.log(user.email, '- user added')
  }catch (e){
    console.error(e)
  }
}

const seedAdminUser = async () => {
  const user = {
    firstName: 'Jack',
    lastName: 'Ryan',
    email: 'jack.ryan@domain.com',
    manager: true,
  }
  return seedUser(user)
}

const users = Array(8)
  .fill(null)
  .map(() => {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      manager: false,
    }
  })
const seedNormalUsers = async () => {
  for await (const user of users) {
    await seedUser(user)
  }
}

const main =async () => {
  console.log('Seeding....')
  await seedAdminUser().catch(console.error)
  await seedNormalUsers().catch(console.error)
  console.log('Seeding completed!')
}

main()
