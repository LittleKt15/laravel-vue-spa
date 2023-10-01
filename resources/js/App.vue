<template>
    <div>
        <header></header>

        <main>
            <router-view></router-view>
            <vue-progress-bar></vue-progress-bar>
        </main>

        <footer></footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
      this.$Progress.finish();
    },
    created() {
      this.$Progress.start();
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          this.$Progress.parseMeta(meta);
        }
        this.$Progress.start();
        next();
      });
      this.$router.afterEach((to, from) => {
        this.$Progress.finish();
      });
    },
};
</script>
