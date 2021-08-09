<template>
        <form @submit.prevent>
            <h4>Create post</h4>
            <input
                v-model="post.title"
                class="input"
                type="text"
                placeholder="Title"
                >
                <!-- v-bind:value="post.title"
                @input="post.title = $event.target.value" -->
            <input
                v-model="post.body"
                class="input"
                type="text"
                placeholder="Description"
             >
                <!-- v-bind:value="post.body"
                @input="post.body = $event.target.value" -->
                <!-- @input="inputBody" -->
            <button
                class="btn"
                @click="createPost"
            >Create</button>
        </form>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
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
            this.id = Date.now();
            this.$emit('create',this.post,'vvvvvvvv22222222','vvvvvvvv33333333');
            this.post = {
                title: '',
                body: ''
            }
            // this.posts.push(newPost);
            // this.title = '';
            // this.body = '';
        },
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
.btn {
    margin-top: 15px;
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
</style>
