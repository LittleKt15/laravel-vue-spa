<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-md-4 col-sm-12 mb-3">
                <button class="btn btn-primary mr-1" @click="create">
                    <i class="fas fa-plus-circle"></i>
                    Create
                </button>
            </div>

            <div class="col-md-4 col-sm-12 mb-3">
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
            <div class="col-md-4 col-sm-12 mb-3">
                <div class="card">
                    <div class="card-header">
                        <h4>Product {{ isEditMode ? 'Edit' : 'Create' }} Form</h4>
                    </div>
                    <div class="card-body">
                        <form action="" @submit.prevent="isEditMode ? update() : store()"
                            @keydown="product.onKeydown($event)">

                            <!-- <AlertError :form="product" :message="message" /> -->
                            <AlertError :form="product" message="There are some problems with your import" />

                            <div class="form-group mb-3">
                                <label for="name">Name: </label>
                                <input v-model="product.name" type="text" id="name" name="name" class="form-control"
                                    :class="{ 'is-invalid': product.errors.has('name') }">
                                <div class="text-danger" v-if="product.errors.has('name')"
                                    v-html="product.errors.get('name')" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="price">Price: </label>
                                <input v-model="product.price" type="text" id="price" name="price" class="form-control"
                                    :class="{ 'is-invalid': product.errors.has('price') }">
                                <div class="text-danger" v-if="product.errors.has('price')"
                                    v-html="product.errors.get('price')" />
                            </div>

                            <button class="btn btn-primary ms-1" type="submit">
                                <i class="fas fa-save"></i>
                                {{ isEditMode ? 'Update' : 'Save' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-md-8 col-sm-12">
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
import Form from 'vform';

export default {
    name: 'ProductComponent',
    data() {
        return {
            isEditMode: false,
            fullPage: false,
            products: {}, //Because of pagination the data will turn array to objects
            // products: [],
            product: new Form({
                id: '',
                name: '',
                price: ''
            }),
            search: '',
        }
    },
    methods: {
        view(page = 1) {
            this.$Progress.start();

            let loader = this.$loading.show({
                color: '#0d6efd',
                loader: 'bars',
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: false,
                onCancel: this.onCancel,
            });

            axios.get(`api/products?page=${page}&search=${this.search}`) // include search
                .then(response => {
                    this.products = response.data
                    this.$Progress.finish();
                    loader.hide()
                })
                .catch(error => {
                    this.$Progress.fail();
                    loader.hide()
                })
        },
        create() {
            this.$Progress.start();
            this.product.clear();
            this.isEditMode = false;
            this.product.reset();
            this.$Progress.finish();
            // this.product.id = '';
            // this.product.name = '';
            // this.product.price = '';
        },
        store() {
            this.product.post('/api/products')
                .then(response => {
                    this.view();
                    this.product.reset();
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Product Created successfully',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    });
                })
                .catch(errors => {
                    this.message = errors.response.data.message
                    // console.log(error.response.data.message);
                })

        },
        edit(product) {
            this.$Progress.start();
            this.product.clear();
            this.isEditMode = true;
            this.product.fill(product)
            this.$Progress.finish();
            // this.product.id = product.id;
            // this.product.name = product.name;
            // this.product.price = product.price;
        },
        update() {
            this.product.put(`/api/products/${this.product.id}`, this.product)
                .then(response => {
                    this.view();
                    this.product.reset();
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Product Updated successfully',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    });
                })
        },
        destroy(id) {
            this.$Progress.start();
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/products/${id}`)
                        .then(response => {
                            this.view();
                            this.$Progress.finish();
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Product Deleted successfully',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                                }
                            });
                        })
                }
                else {
                    this.$Progress.fail();
                }
            })
        },
    },
    created() {
        this.view();
    }
}
</script>
