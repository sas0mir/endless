import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout.tsx";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import EditorPage from "@/pages/project/EditorPage";
import PlayPage from "@/pages/play/PlayPage";
import { redirect } from "react-router-dom";

/**
 * Temporary mock auth (frontend-only)
 */
function getMockUser() {
    const raw = localStorage.getItem("mock_user");
    return raw ? JSON.parse(raw) : null;
}

export function checkAuth() {
    return !!getMockUser();
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            if (checkAuth()) {
                return redirect("/dashboard");
            }
            return null;
        },
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                loader: () => {
                    if (!checkAuth()) {
                        return redirect("/login");
                    }
                    return redirect("/dashboard");
                },
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
                loader: () => {
                    if (!checkAuth()) {
                        return redirect("/login");
                    }
                    return null;
                },
            },
            {
                path: "project/:id",
                element: <EditorPage />,
                loader: () => {
                    if (!checkAuth()) {
                        return redirect("/login");
                    }
                    return null;
                },
            },
            {
                path: "play/:id",
                element: <PlayPage />,
                loader: () => {
                    if (!checkAuth()) {
                        return redirect("/login");
                    }
                    return null;
                },
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