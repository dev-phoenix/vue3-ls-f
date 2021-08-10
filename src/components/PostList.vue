<template>
    <div
        v-if="posts.length > 0"
     >
        <h3>Post list</h3>
        <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove',post)"
            />
    </div>
    <h2
        v-else
        style="color: red">
        List empty
    </h2>
        <!-- v-show="posts.length > 0"
        v-show="posts.length === 0" -->
</template>
<script>
import PostItem from "@/components/PostItem";


export default {
    components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped>
</style>