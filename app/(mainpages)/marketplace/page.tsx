/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react';
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout'
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { DollarSign, MapPin, MessageCircle, Share2 } from 'lucide-react'

const products = [
  {
    title: "MacBook Pro 2023",
    price: 1299,
    location: "San Francisco, CA",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    title: "iPhone 14 Pro",
    price: 899,
    location: "Los Angeles, CA",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"
  },
  {
    title: "Sony Headphones",
    price: 199,
    location: "New York, NY",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  // Add more products as needed
]

export default function MarketplacePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">

        <div className="flex">

          <main className="flex-1 p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <Button>Sell Item</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        {product.price}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.location}
                      </div>
                      <div>Condition: {product.condition}</div>
                    </div>
                    <div className="flex justify-between">
                      <Button className="flex-1 mr-2">Contact Seller</Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
} 