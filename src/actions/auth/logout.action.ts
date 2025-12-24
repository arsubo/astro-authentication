import { defineAction } from "astro:actions";
import { signOut } from "firebase/auth";
import { z } from "astro:schema";
import { firebase } from "@/firebase/config";

export const logout = defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    // Tu lógica de acción aquí

    return await signOut(firebase.auth);
  },
});
