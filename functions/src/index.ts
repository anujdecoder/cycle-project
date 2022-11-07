import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const SEED_KEY = "c49fd22c-05f9-40a0-b1ac-525803af7875";

admin.initializeApp();

exports.createUser = functions.https.onCall(async (data, context) => {
  if (context.auth?.token.manager || data.seedKey === SEED_KEY) {
    try {
      const user = await admin.auth().createUser({
        email: data.email,
        emailVerified: true,
        password: data.password,
        displayName: data.firstName + " " + data.lastName,
        disabled: false,
      });
      await admin.auth().setCustomUserClaims(user.uid, {
        manager: !!data.manager,
      });
      return user.uid;
    } catch (error) {
      console.log("create-user", error);
      return new functions.https.HttpsError("unauthenticated", "failed to create user");
    }
  }

  return "";
});

exports.updateRole = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.manager) {
    return "";
  }
  try {
    await admin.auth().setCustomUserClaims(data.userId, {
      manager: Boolean(data.manager),
    });
    return {response: "success"};
  } catch (error) {
    console.log("update-user-role", error);
    return new functions.https.HttpsError("unauthenticated", "failed to update user role");
  }
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth?.token.manager) {
      return "";
    }
    await admin.auth().deleteUser(data.userId);
    return {response: "success"};
  } catch (error) {
    console.log("delete-user", error);
    return new functions.https.HttpsError("unauthenticated", "failed to delete user");
  }
});
