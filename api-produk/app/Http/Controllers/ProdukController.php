<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use App\Http\Resources\ProdukResource;

class ProdukController extends Controller
{
    //
    public function index(){
   
        return ProdukResource::collection( resource: Produk::all()); 
    }
}