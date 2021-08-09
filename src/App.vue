<template>
    <div class="app">
        
        <!-- <div>
            <button v-on:click="addLike">Like</button>
            <button @click ="addDislike">Dislike</button>
        </div>
        <div> Кол-во лайков <strong> {{ likes }} </strong> </div>
        <div> Кол-во дизлайков <strong> {{ dislikes }} </strong> </div> -->

        <post-form
         @create="createPost"
         />
        <post-list
         :posts="posts"
         />
        <!-- <post-list v-bind:posts="posts"/> -->
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';

export default {
  components: { PostForm, PostList },
    data() {
        return {
            likes: 0,
            dislikes: 0,
            posts: [
                {id: 1, title: 'javascript', body: 'Описание'},
                {id: 1, title: 'javascript', body: 'Описание 2'},
                {id: 1, title: 'javascript', body: 'Описание 3'},
            ],
            // title: '',
            // body: ''
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
</style>
