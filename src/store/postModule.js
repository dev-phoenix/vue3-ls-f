import axios from "axios";

export const postModule = {

    state: () => ({
        likes: 0,
        dislikes: 0,
        posts: [
            // {id: 1, title: 'javascript', body: 'Описание'},
            // {id: 2, title: 'javascript', body: 'Описание 2'},
            // {id: 3, title: 'javascript', body: 'Описание 3'},
        ],
        // title: '',
        // body: ''
        // dialogVisible: false,
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
    }),
    getters: {
        doubleLikes(state) {
            return state.likes * 2;
        },
        sortedPosts(state) {
            return [...state.posts].sort((post1,post2) => {
                if(state.selectedSort === 'id')
                    return post1['id'] - post2['id'];
                else
                    return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title
            .toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        incrementLikes(state) {
            state.likes++
        },
        decrementLikes(state) {
            state.likes--
        },
        setDislikes(state, dislikes) {
            state.dislikes = dislikes
        },
        // setIsAuth(state, isAuth) {
        //     state.isAuth = isAuth
        // },
        setPosts(state, posts) {
            state.posts = posts
        },
        setModificatorValue(state, modificatorValue) {
            state.modificatorValue = modificatorValue
        },
        setIsPostLoading(state, bool) {
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        // setSortOptions(state, sortOptions) {
        //     state.sortOptions = sortOptions
        // },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        // setLimit(state, limit) {
        //     state.limit = limit
        // },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setIsPostLoading', true);
                // this.isPostLoading = true;
                // this.isPostLoading = false;
                // setTimeout( async () => {
                    const response = await axios.get('http://jsonplaceholder.typicode.com/posts',{
                            params: {
                                _page: state.page,
                                _limit: state.limit
                            }
                        }
                    );
                    // console.log(response)
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count']/state.limit))
                    commit('setPosts', response.data)
                    // this.isPostLoading = true;
                // }, 1000)
            } catch (e) {
                // alert('error')
                    console.log(e)
            } finally {
                // alert('finally')
                commit('setIsPostLoading', false);
                // this.isPostLoading = false;
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1 );
                // this.page +=1; 
                // this.isPostLoading = true;
                // this.isPostLoading = false;
                // setTimeout( async () => {
                    const response = await axios.get('http://jsonplaceholder.typicode.com/posts',{
                            params: {
                                _page: state.page,
                                _limit: state.limit
                            }
                        }
                    );
                    console.log(response)
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count']/state.limit) )
                    commit('setPosts',  [...state.posts, ...response.data]);
                    // this.isPostLoading = true;
                // }, 1000)
            } catch (e) {
                // alert('error')
                    console.log(e)
            } finally {
                // alert('finally')
                // this.isPostLoading = false;
            }
        },
    },
    namespaced: true,
}