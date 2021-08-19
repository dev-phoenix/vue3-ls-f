<template>
    <div class="">
        <h1>Posts page</h1>
        <my-input
            v-model="searchQuery"
            v-focus
            placeholder="Search...."
        />
        <div class="app__btns">
            <!-- <my-button
                @click="fetchPosts"
            >Get posts</my-button> -->
            <my-button
                @click="showDialog"
            >Create post</my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <!-- <input type="text" v-model.trim="modificatorValue"> -->
        <!-- <input type="text" v-model.number="modificatorValue"> -->
        <!-- <div>
            <button v-on:click="addLike">Like</button>
            <button @click ="addDislike">Dislike</button>
        </div>
        <div> Кол-во лайков <strong> {{ likes }} </strong> </div>
        <div> Кол-во дизлайков <strong> {{ dislikes }} </strong> </div> -->

        <my-dialog
            v-model:show="dialogVisible"
            >
            <post-form
                @create="createPost"
            />
        </my-dialog>
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

export default {
    components: { PostForm, PostList },
    data() {
        return {
            likes: 0,
            dislikes: 0,
            posts: [
                // {id: 1, title: 'javascript', body: 'Описание'},
                // {id: 2, title: 'javascript', body: 'Описание 2'},
                // {id: 3, title: 'javascript', body: 'Описание 3'},
            ],
            // title: '',
            // body: ''
            dialogVisible: false,
            modificatorValue: '',
            isPostLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By desctiption'},
                {value: 'id', name: 'By id'},
            ],
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0
        }
    },
    methods: {
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                // this.isPostLoading = false;
                // setTimeout( async () => {
                    const response = await axios.get('http://jsonplaceholder.typicode.com/posts',{
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        }
                    );
                    // console.log(response)
                    this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
                    this.posts = response.data
                    // this.isPostLoading = true;
                // }, 1000)
            } catch (e) {
                alert('error')
                    console.log(e)
            } finally {
                // alert('finally')
                this.isPostLoading = false;
            }
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
            
        // },
        async loadMorePosts() {
            try {
                this.page +=1; 
                // this.isPostLoading = true;
                // this.isPostLoading = false;
                // setTimeout( async () => {
                    const response = await axios.get('http://jsonplaceholder.typicode.com/posts',{
                            params: {
                                _page: this.page,
                                _limit: this.limit
                            }
                        }
                    );
                    // console.log(response)
                    this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
                    this.posts = [...this.posts, ...response.data];
                    // this.isPostLoading = true;
                // }, 1000)
            } catch (e) {
                alert('error')
                    console.log(e)
            } finally {
                // alert('finally')
                // this.isPostLoading = false;
            }
        },
    },
    mounted() {
        this.fetchPosts(); 
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1,post2) => {
                if(this.selectedSort === 'id')
                    return post1['id'] - post2['id'];
                else
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title
            .toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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
