/* eslint-disable @next/next/no-img-element */
'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout' 
import { Card } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

const photos = [
  {
    title: "Mountain Landscape",
    author: "Nature Photography",
    likes: 234,
    comments: 12,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  },
  {
    title: "Urban Architecture",
    author: "City Captures",
    likes: 189,
    comments: 8,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
  },
  {
    title: "Street Photography",
    author: "Urban Stories",
    likes: 145,
    comments: 5,
    image: "https://images.unsplash.com/photo-1492369667241-5c4f8e791973"
  }
]

export default function PhotosPage() {
  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Photos</h1>
          <Button>Upload Photos</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-square">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-500 mb-3">by {photo.author}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    {photo.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {photo.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
} 