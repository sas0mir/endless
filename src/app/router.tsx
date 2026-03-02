import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout.tsx";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import EditorPage from "@/pages/project/EditorPage";
import PlayPage from "@/pages/play/PlayPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <RootLayout />,
        loader: async () => {
            // const isAuth = checkAuth();
            //
            // if (!isAuth) {
            //     throw redirect("/login");
            // }
            return null;
        },
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "project/:id",
                element: <EditorPage />,
            },
            {
                path: "play/:id",
                element: <PlayPage />,
            },
        ],
    },
    {
        path: "*",
        element: <div>Not Found</div>,
    }
],
    {
        basename: "/endless/"
    }
    );