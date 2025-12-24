import { defineAction } from "astro:actions";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";
import { z } from "astro:schema";

import { firebase } from "@/firebase/config";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, password, remember_me, email }, { cookies }) => {
    //cookies
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), //1 año
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    //creación del usuario
    try {
      const credential = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      const user = firebase.auth.currentUser!;

      //Actualizar el nombre (displayName)
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      //verificar el correo electrónico
      await sendEmailVerification(user, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      // Retornar solo datos serializables
      return JSON.stringify(user);
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El correo ya está en uso");
      }

      throw new Error("Algo salió mal muy mal");
    }
  },
});
