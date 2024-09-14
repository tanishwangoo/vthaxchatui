"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X } from "lucide-react"

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' }
      setMessages([...messages, newMessage])
      setInput('')
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = { id: messages.length + 2, text: "I'm a demo bot. I can't actually process your message, but in a real implementation, I would respond here!", sender: 'bot' }
        setMessages(prevMessages => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}

      <div className={`fixed bottom-0 right-0 w-96 h-[600px] bg-background border rounded-tl-lg shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="flex justify-between items-center bg-primary p-4 text-primary-foreground">
          <h2 className="text-2xl font-bold">Talk to InstaPC Bot</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close chat</span>
          </Button>
        </div>

        <ScrollArea className="flex-grow p-4 h-[calc(100%-8rem)]">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                  <AvatarImage src='https://cdn-icons-png.freepik.com/512/8943/8943377.png'
                    ></AvatarImage>
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 bg-background">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}