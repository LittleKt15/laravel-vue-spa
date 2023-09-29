<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string',
            'price' => 'required|numeric',
            "name.required" => "Need your Mother Fucker Product Name",
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['name'] = 'nullable|string';
            $rules['price'] = 'nullable|numeric';
        }

        return $rules;
    }
}
