import Main from "@/pages/Main";
import PostsPage from "@/pages/PostsPage";
import PostsPageWithStor from "@/pages/PostsPageWithStor";
import PostsPagePager from "@/pages/PostsPagePager";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
const { createRouter, createWebHashHistory,createWebHistory } = require("vue-router")


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/store',
        component: PostsPageWithStor
    },
    {
        path: '/posts_p',
        component: PostsPagePager
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/post/:id',
        component: PostPage
    },
    
]

const router = createRouter({
    routes,
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    
})

export default router;

