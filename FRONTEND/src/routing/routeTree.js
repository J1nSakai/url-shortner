import { createRootRoute } from "@tanstack/react-router";
import RootRoute from "../RootRoute";
import NotFound from "../components/NotFound";

import { authRoute } from "./authRoute";
import { dashboardRoute } from "./dashboardRoute";
import { homePageRoute } from "./homepageRoute";

export const rootRoute = createRootRoute({
  component: RootRoute,
  notFoundComponent: NotFound,
});

export const routeTree = rootRoute.addChildren([
  authRoute,
  homePageRoute,
  dashboardRoute,
]);
