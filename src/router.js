import TrafficLight from "./components/TrafficLight";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/:color(.*)", component: TrafficLight}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;