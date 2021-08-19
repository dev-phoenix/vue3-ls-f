<template>
    <div class="post" >
        <div class="" >

            <div><strong>ID:</strong>{{ post.id }} likes: {{ $store.state.likes }}</div>
            <div><strong>Title:</strong>{{ post.title }}</div>
            <div><strong>Description:</strong>{{ post.body }}</div>
        </div>
        <div class="post__btns" >
            <my-button
            @click="$router.push(`/post/${post.id}`)"
            >Open</my-button>
            <my-button
            @click="$emit('remove',post)"
            >Delete</my-button>
        </div>
    </div>
</template>
<script>
// import MyButton from '@/components/UI/MyButton'
// import { defineComponent } from '@vue/composition-api'

export default {
  components: {
    //    MyButton
        },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/* .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
} */
.post__btns {
    display: flex;
}
</style>