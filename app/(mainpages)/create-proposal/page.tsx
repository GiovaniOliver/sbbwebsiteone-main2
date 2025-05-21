'use client'

import { Button } from '@/app/components/atoms/buttons/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Label } from '@/app/components/atoms/feedback/Label'
import { Textarea } from '@/app/components/atoms/inputs/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateProposalPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [fundingRequired, setFundingRequired] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Here you would add your API call to submit the proposal
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/homefeed')
    }, 1500)
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Create New Proposal</h1>
      
      <Card className="bg-[#2E3446]">
        <CardHeader>
          <CardTitle>Proposal Details</CardTitle>
          <CardDescription>Enter the details of your proposal for the community to review.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a clear title for your proposal" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-[#252A3C] border-[#3A4051]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
                required
              >
                <SelectTrigger className="bg-[#252A3C] border-[#3A4051]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#2E3446]">
                  <SelectItem value="business">Business Development</SelectItem>
                  <SelectItem value="community">Community Initiative</SelectItem>
                  <SelectItem value="education">Educational Program</SelectItem>
                  <SelectItem value="technology">Technology Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your proposal in detail" 
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-[#252A3C] border-[#3A4051]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="funding">Funding Required (in $)</Label>
              <Input 
                id="funding" 
                type="number" 
                placeholder="0.00" 
                value={fundingRequired}
                onChange={(e) => setFundingRequired(e.target.value)}
                className="bg-[#252A3C] border-[#3A4051]"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t border-[#3A4051] pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              className="border-[#3A4051] text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#F5A524] hover:bg-[#E09010] text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
