

export default {
    name: 'intersection',
    mounted(el, binding) {
        console.log(el,binding); 
        
        // console.log(this.$refs.observer);
        const options = {
            // root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            /* Content excerpted, show below */
            // console.log(entries)
            // console.log(entries[0].isIntersecting, entries[0].isVisible)
            if(entries[0].isIntersecting
                //  && this.page < this.totalPages
                  ) {
                console.log('across')
                binding.value();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
        // observer.observe(this.$refs.observer);
    }
}
