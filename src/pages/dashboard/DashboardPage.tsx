// import React from "react";
import {ControlPanel} from "@/components/reusable/control_panel/control-panel.tsx";
import styles from "./styles.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { PlusIcon } from "lucide-react";
import {Button2d, Carousel} from "@/components/reusable"
import { useNavigate } from "react-router";

export default function DashboardPage() {

    const { user } = useAuthStore();
    const navigate = useNavigate();
    const userProjects = [{name: "test01", id: "123", likes: 5}];
    const mockProgects = [
        { id: "1111", title: "test001", description: "test001 description", preview: "https://picsum.photos/200" },
        { id: "1112", title: "test002", description: "test002 description", preview: "https://picsum.photos/200" },
        { id: "1113", title: "test003", description: "test003 description", preview: "https://picsum.photos/200" },
        { id: "1114", title: "test004", description: "test004 description", preview: "https://picsum.photos/200" }];
    return (
        <main className={styles.main}>
            <ControlPanel userId={"test"} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className="font-dialog-header font-color-elementary">{`${user?.email}s' dashboard`}</h2>
                </header>
                <section className={styles.user_projects_container}>
                    {userProjects.map((up, idx) => (
                        <div key={up.id} className={styles.user_project_item} style={{backgroundImage: "url(https://picsum.photos/200)"}}>
                            <h4 className={styles.user_project_title}>{up.name}</h4>
                        </div>
                    ))}
                    <Button2d onClick={() => navigate("/project/0")} className={styles.user_project_template} icon={<PlusIcon width={50} height={50} className={styles.icon_dashboard} />} />
                </section>
                <section>
                    <Carousel items={mockProgects}  />
                </section>
            </div>
        </main>
    )
}