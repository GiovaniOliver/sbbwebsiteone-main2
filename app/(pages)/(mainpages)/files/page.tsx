'use client'

import Layout from '@/app/components/usersmaincomponents/homefeed/Layout'
import { Card } from '@/app/components/usersmaincomponents/homefeed/ui/card'
import { Button } from '@/app/components/usersmaincomponents/homefeed/ui/button'
import { FileText, Download, Share2, Folder, File } from 'lucide-react'

const files = [
  {
    name: "Project Documentation",
    type: "folder",
    items: 12,
    lastModified: "2 days ago"
  },
  {
    name: "Design Assets",
    type: "folder",
    items: 8,
    lastModified: "5 days ago"
  },
  {
    name: "Presentation.pptx",
    type: "file",
    size: "2.4 MB",
    lastModified: "1 day ago"
  },
  {
    name: "Report.pdf",
    type: "file",
    size: "1.8 MB",
    lastModified: "3 hours ago"
  },
  // Add more files as needed
]

export default function FilesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">

        <div className="flex">
          <main className="flex-1 p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Files</h1>
              <div className="space-x-2">
                <Button variant="outline">New Folder</Button>
                <Button>Upload File</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {file.type === 'folder' ? (
                        <Folder className="h-10 w-10 text-blue-500" />
                      ) : (
                        <File className="h-10 w-10 text-gray-500" />
                      )}
                      <div>
                        <h3 className="font-semibold">{file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {file.type === 'folder' ? `${file.items} items` : file.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Modified {file.lastModified}
                    </span>
                    {file.type === 'file' && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
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