'use client';

import { Button } from '@/app/components/atoms/buttons/Button';
import { Input } from '@/app/components/atoms/inputs/Input';
import { Textarea } from '@/app/components/atoms/inputs/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/molecules/inputs/SelectPrimitive';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card';

export default function ComponentsTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Components Test</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button isLoading>Loading Button</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Input</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Textarea</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <Textarea placeholder="Enter your message" />
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here. This is a paragraph of text to demonstrate the content area.</p>
          </CardContent>
          <CardFooter>
            <Button>Card Action</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 