<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProdukResource extends JsonResource
{
 
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama'=> $this->nama,
            'harga'=>$this->harga,
            'deskripsi'=>$this->deskripsi,
            'rating'=>$this->rating,
            'jumlah_ulasan' => $this->jumlah_ulasan,
            'terjual'=> $this->terjual,
            'link_gambar' => $this->link_gambar,
            'lokasi'=>$this->lokasi
        ];
    }
}