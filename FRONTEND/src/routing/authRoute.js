import { createRoute } from "@tanstack/react-router";
import Auth from "../pages/Auth";
import { rootRoute } from "./routeTree";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: Auth,
});
