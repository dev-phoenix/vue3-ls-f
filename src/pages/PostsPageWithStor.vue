<template>
    <div class="">
        <!-- <h1>{{ $store.state.post.limit }}</h1>
        {{ $store.commit('post/setIsPostLoading') }} -->

        <h1>{{ $store.state.isAuth?'User is authorized':'SignUp' }}</h1>
        <!-- <h1>{{ $store.getters.doubleLikes }}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div> -->
        <div>
            <my-button @click="$store.commit('setIsAuth', true)">log in</my-button>
            <my-button @click="$store.commit('setIsAuth', false)">log out</my-button>
        </div> 

        
        <h1>Posts page</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            v-focus
            placeholder="Search...."
        />
            <!-- v-model="searchQuery" -->
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >Create post</my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
                <!-- v-model="selectedSort" -->
        </div> 
             <!-- <my-button
                @click="fetchPosts"
            >Get posts</my-button> -->


        <!-- <input type="text" v-model.trim="modificatorValue"> -->
        <!-- <input type="text" v-model.number="modificatorValue"> -->
        <!-- <div>
            <button v-on:click="addLike">Like</button>
            <button @click ="addDislike">Dislike</button>
        </div>
        <div> Кол-во лайков <strong> {{ likes }} </strong> </div>
        <div> Кол-во дизлайков <strong> {{ dislikes }} </strong> </div> -->

        <!-- <my-dialog
            v-model:show="dialogVisible"
            >
            <post-form
                @create="createPost"
            />
        </my-dialog> -->
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        />


            <!-- :posts="posts" -->


        <div v-else>Loading ...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>

        <!-- <div ref="observer" class="observer"></div> -->
        <!-- <post-list v-bind:posts="posts"/> -->
        <!-- <div class="page__wrapper">
            <div
             v-for="pageNumber in totalPages"
             :key="pageNumber"
             class="page"
             :class="{
                    'current-page': page == pageNumber
                }"
            @click="changePage(pageNumber)"
            >{{ pageNumber }}</div>
        </div> -->
            
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import {mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: { PostForm, PostList },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPosts: 'post/setPosts',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setPage: 'post/setPage',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),

        addLike() {
            this.likes += 1;
        },
        addDislike() {
            this.dislikes += 1;
        },
        createPost(post,p2,p3) {
            // console.log(post);
            // console.log(p2);
            // console.log(p3);
            this.posts.push(post);
            this.dialogVisible = false;


        //     const newPost = {
        //         id: Date.now(),
        //         title: this.title,
        //         body: this.body
        //     }
        //     this.posts.push(newPost);
        //     this.title = '';
        //     this.body = '';
        },
        // inputTitle(event) {
        //     // console.log(event)
        //     this.title = event.target.value
        // },
        // inputBody(event) {
        //     this.body = event.target.value
        // }
        removePost(post) {
            console.log(post)
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
    },
    mounted() {
        //$store.commit('post/setPage', 1)
        this.setPage(1); 
        this.fetchPosts(); 
    },
    computed: {
        ...mapState({
            isAuth: state => state.post.isAuth,
            likes: state => state.post.likes,
            dislikes: state => state.post.dislikes,
            posts: state => state.post.posts,
            // title: '',
            // body: ''
            // dialogVisible: false,
            modificatorValue: state => state.post.modificatorValue,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
        }),
        ...mapGetters({
            doubleLikes: 'post/doubleLikes',
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        }),
        // sortedPosts() {
        //     return [...this.posts].sort((post1,post2) => {
        //         if(this.selectedSort === 'id')
        //             return post1['id'] - post2['id'];
        //         else
        //             return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        //     })
        // },
        // sortedAndSearchedPosts() {
        //     return this.sortedPosts.filter(post => post.title
        //     .toLowerCase().includes(this.searchQuery.toLowerCase()))
        // }
    },
    watch: {
        // selectedSort(newValue) {
        //     // console.log(newValue)
        //     this.posts.sort((post1,post2) => {
        //         if(newValue === 'id')
        //             return post1['id'] - post2['id'];
        //         else
        //             return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // },
        dialogVisible(newValue) {
            console.log(newValue);
        },
        // page() {
        //     this.fetchPosts();
        // }
    }
}

// export default {
//   name: 'App',
//   components: {
//     // HelloWorld
//   }
// }
</script>

<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
    background-color: teal;
    color: white;
    font-weight: 700;
}
.observer {
    height: 30px;
    background: teal;
}
</style>
