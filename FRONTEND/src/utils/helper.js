import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { store, queryClient } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    console.log(user);
    if (!user) {
      return false;
    }

    const { isAutheticated } = store.getState().auth;
    console.log(isAutheticated);
    // if (!isAutheticated) {
    //   return false;
    // }
    store.dispatch(login(user.data.user));
  } catch (error) {
    return redirect({
      to: "/auth",
    });
  }
};
