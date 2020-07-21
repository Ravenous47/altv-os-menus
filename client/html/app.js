Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            ready: false,
            menuInfo: null
        };
    },
    computed: {},
    methods: {
        setReady(menuInfo) {
            this.show = true;
            this.menuInfo = menuInfo;
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('menus:Ready', this.ready);
        } else {
            this.menuInfo = {};
        }
    }
});
