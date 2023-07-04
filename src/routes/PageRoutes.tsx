import { ReactNode } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { PspdfkitPage } from "../features/pspdfkit/components/pages/PspdfkitPage";
import { PagePaths } from "../config/PagePaths";
import { BaseTemplate } from "../components/template/base/BaseTemplate";

const routeList: RouteProps[] = [
  { path: "/", element: <PspdfkitPage /> },
  {
    path: PagePaths.PSPDFKIT,
    element: <PspdfkitPage />,
  },
];

export const PageRoutes = () => {
  return (
    <Routes>
      {routeList.map(({ element, path, ...rest }) => {
        return <Route key={path} path={path} element={createElement(element)} {...rest} />;
      })}
    </Routes>
  );
};

const createElement = (element: ReactNode) => {
  return <BaseTemplate>{element}</BaseTemplate>;
};
