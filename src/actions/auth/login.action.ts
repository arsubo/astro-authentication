import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { defineAction } from "astro:actions";
import { object, z } from "astro:schema";
import { firebase } from "@/firebase/config";

export const login = defineAction({
  accept: "form",
  input: object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ password, remember_me, email }, { cookies }) => {
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

    try {
      const credential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      const user = credential.user;

      return JSON.stringify(user);
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/invalid-credential") {
        throw new Error("Credenciales no válidas");
      }

      throw new Error("Algo salió mal");
    }
  },
});
