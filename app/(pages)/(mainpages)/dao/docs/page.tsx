'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { Search, Book, FileText, Bookmark, ArrowRight, Star, Clock, Users } from 'lucide-react'

// Mock data for documentation categories
const categories = [
  {
    title: "Getting Started",
    icon: Book,
    description: "Essential guides for new DAO members",
    articles: [
      {
        title: "Introduction to SBB DAO",
        description: "Learn about our mission, values, and governance structure",
        readTime: "5 min read",
        lastUpdated: "2023-12-01"
      },
      {
        title: "How to Participate",
        description: "Guide to joining discussions, voting, and creating proposals",
        readTime: "8 min read",
        lastUpdated: "2023-12-03"
      }
    ]
  },
  {
    title: "Governance",
    icon: Users,
    description: "Understanding DAO decision-making",
    articles: [
      {
        title: "Voting Mechanism",
        description: "Detailed explanation of our voting system and token weights",
        readTime: "10 min read",
        lastUpdated: "2023-11-28"
      },
      {
        title: "Proposal Guidelines",
        description: "How to create and submit effective proposals",
        readTime: "12 min read",
        lastUpdated: "2023-11-25"
      }
    ]
  }
]

// Mock data for featured articles
const featuredArticles = [
  {
    title: "DAO Treasury Management",
    description: "Learn about how we manage and allocate DAO funds",
    category: "Finance",
    readTime: "15 min read",
    views: 1240,
    lastUpdated: "2023-12-04"
  },
  {
    title: "Community Guidelines",
    description: "Our code of conduct and community standards",
    category: "Community",
    readTime: "7 min read",
    views: 890,
    lastUpdated: "2023-12-02"
  }
]

export default function DocumentationPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
            <p className="text-gray-500">Guides and resources for the DAO community</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <FileText className="h-4 w-4" />
            Create Guide
          </Button>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold mb-2">Search Documentation</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides and documentation..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </Card>

        {/* Featured Articles */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="space-y-8">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-4">
                <category.icon className="h-6 w-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.articles.map((article, articleIndex) => (
                  <Card 
                    key={articleIndex} 
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{article.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
} 