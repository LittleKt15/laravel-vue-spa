<template>
    <div class="container">
        <div class="d-flex justify-content-center align-items-center flex-column vh-100">
            <h1>Welcome to Laravel+Vue SPA</h1>
            <router-link to="/product" class="fs-3 text-decoration-none">Go to Product CRUD Page</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExampleComponent',
}
</script>
