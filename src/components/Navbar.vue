<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/store')">Store</my-button>
            <my-button @click="$router.push('/posts')">Posts infinity load</my-button>
            <my-button @click="$router.push('/posts_p')">Posts with pager</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 20px;">About</my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped> 
    .navbar {
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .navbar__btns {
        margin-left: auto;
    }
    .navbar__btns .btn{
        margin-left: 20px;
    }

</style>