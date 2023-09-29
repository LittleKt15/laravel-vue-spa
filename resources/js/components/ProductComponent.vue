<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary mr-1" @click="create">
                    <i class="fas fa-plus-circle"></i>
                    Create
                </button>
            </div>

            <div class="col-4">
                <form action="" @submit.prevent="view">
                    <div class="input-group">
                        <input v-model="search" type="text" class="form-control" placeholder="Search">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h4>Product {{ isEditMode ? 'Edit' : 'Create' }} Form</h4>
                    </div>
                    <div class="card-body">
                        <form action="" @submit.prevent="isEditMode ? update() : store()">
                            <div class="form-group mb-3">
                                <label for="name">Name: </label>
                                <input v-model="product.name" type="text" id="name" name="name" class="form-control">
                            </div>

                            <div class="form-group mb-3">
                                <label for="price">Price: </label>
                                <input v-model="product.price" type="number" id="price" name="price" class="form-control">
                            </div>

                            <button class="btn btn-primary ms-1" type="submit">
                                <i class="fas fa-save"></i>
                                {{ isEditMode ? 'Update' : 'Save' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products.data" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button class="btn btn-info btn-sm text-white" @click="edit(product)">
                                    <i class="fas fa-edit"></i>
                                    Edit
                                </button>
                                <button class="btn btn-danger btn-sm ms-1" @click="destroy(product.id)">
                                    <i class="fas fa-trash"></i>
                                    Del
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Bootstrap5Pagination :data="products" @pagination-change-page="view" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
    name: 'ProductComponent',
    data() {
        return {
            isEditMode: false,

            products: {}, //Because of pagination the data will turn array to objects
            // products: [],

            product: {
                id: '',
                name: '',
                price: ''
            },

            search: '',
        }
    },
    methods: {
        view(page = 1) {
            // axios.get('api/products?page=' + page)
            axios.get(`api/products?page=${page}&search=${this.search}`) // No need search methods
                .then(response => {
                    this.products = response.data
                });
        },
        create() {
            this.isEditMode = false;
            this.product.id = '';
            this.product.name = '';
            this.product.price = '';
        },
        store() {
            axios.post('/api/products', this.product)
                .then(response => {
                    this.view();
                    this.product = { name: '', price: '' };
                })

        },
        edit(product) {
            this.isEditMode = true;
            this.product.id = product.id;
            this.product.name = product.name;
            this.product.price = product.price;
        },
        update() {
            axios.put(`/api/products/${this.product.id}`, this.product)
                .then(response => {
                    this.view();
                    this.product.id = '';
                    this.product.name = '';
                    this.product.price = '';
                })
        },
        destroy(id) {
            if (!confirm('Are you sure you want to delete?')) {
                return;
            }

            axios.delete(`/api/products/${id}`)
                .then(response => {
                    this.view();
                })
        },
        // searchProduct() {
        //     axios.get('/api/products?search=' + this.search)
        //         .then(response => this.products = response.data)
        // }
    },
    components: {
        Bootstrap5Pagination,
    },
    created() {
        this.view();
    }
}
</script>
