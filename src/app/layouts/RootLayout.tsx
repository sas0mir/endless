import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <>
            {/* позже тут будет header / sidebar */}
            <Outlet />
        </>
    );
}