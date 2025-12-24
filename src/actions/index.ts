import { login, loginWithGoogle, logout, registerUser } from "./auth";

export const server = {
  //actions

  //Authentication
  registerUser,
  logout,
  login,
  loginWithGoogle,
};
