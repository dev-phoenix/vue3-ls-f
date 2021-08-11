<template>
        <form @submit.prevent>
            <h4>Create post</h4>
            <my-input
                v-model="post.title"
                type="text"
                placeholder="Title"
                />
                <!-- v-bind:value="post.title"
                @input="post.title = $event.target.value" -->
            <my-input
                v-model="post.body"
                type="text"
                placeholder="Description"
             />
                <!-- v-bind:value="post.body"
                @input="post.body = $event.target.value" -->
                <!-- @input="inputBody" -->
                
            <my-button
                class="as-fe"
                @click="createPost"
            >Create</my-button>
        </form>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  components: {
    //    MyButton 
       },
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            // const newPost = {
            //     id: Date.now(),
            //     title: this.title,
            //     body: this.body
            // }
            this.post.id = Date.now();
            this.$emit('create',this.post,'vvvvvvvv22222222','vvvvvvvv33333333');
            this.post = {
                title: '',
                body: ''
            }
            // this.posts.push(newPost);
            // this.title = '';
            // this.body = '';
        },
    },
    watch: {
        post: {
            handler(v) {
                console.log(v)
            },
            deep: true
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
