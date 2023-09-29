<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::when(request('search'), function ($product) {
            $product->where('name', 'like', '%' . request('search') . '%');
        })->orderBy('id', 'desc')->paginate(5);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        return Product::create($request->only('name', 'price'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product) //route model binding
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product) //route model binding
    {
        return $product->update($request->only('name', 'price'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product) //route model binding
    {
        return $product->delete();
    }
}
