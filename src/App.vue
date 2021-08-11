<template>
    <div class="app">
        <h1>Posts page</h1>
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
            :posts="sortedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
         />
            <!-- :posts="posts" -->
         <div v-else>Loading ...</div>
        <!-- <post-list v-bind:posts="posts"/> -->
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
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
            ]
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
                    const response = await axios.get('http://jsonplaceholder.typicode.com/posts?_limit=10');
                    console.log(response)
                    this.posts = response.data
                    // this.isPostLoading = true;
                // }, 1000)
            } catch (e) {
                alert('error')
            } finally {
                // alert('finally')
                this.isPostLoading = false;
            }
        }
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
        }
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
</style>
