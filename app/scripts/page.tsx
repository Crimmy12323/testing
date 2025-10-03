"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Download, Star, TrendingUp, Zap, Edit, Trash2, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialScripts = [
  {
    id: 1,
    name: "Infinite Yield",
    category: "Admin",
    description: "The most popular admin script for Roblox with hundreds of commands.",
    rating: 4.9,
    downloads: "1M+",
    trending: true,
    link: "https://example.com/infinite-yield",
  },
  {
    id: 2,
    name: "Dark Dex",
    category: "Explorer",
    description: "Advanced game explorer with detailed object inspection capabilities.",
    rating: 4.8,
    downloads: "500K+",
    trending: false,
    link: "https://example.com/dark-dex",
  },
  {
    id: 3,
    name: "Universal ESP",
    category: "Visual",
    description: "See players, items, and objects through walls in any game.",
    rating: 4.6,
    downloads: "750K+",
    trending: true,
    link: "https://example.com/universal-esp",
  },
  {
    id: 4,
    name: "Auto Farm",
    category: "Automation",
    description: "Automated farming script compatible with multiple popular games.",
    rating: 4.5,
    downloads: "600K+",
    trending: false,
    link: "https://example.com/auto-farm",
  },
  {
    id: 5,
    name: "Speed Hack",
    category: "Movement",
    description: "Increase your character's movement speed in any game.",
    rating: 4.3,
    downloads: "400K+",
    trending: false,
    link: "https://example.com/speed-hack",
  },
  {
    id: 6,
    name: "Fly Script",
    category: "Movement",
    description: "Universal fly script that works in most Roblox games.",
    rating: 4.7,
    downloads: "850K+",
    trending: true,
    link: "https://example.com/fly-script",
  },
]

export default function Scripts() {
  const { isAdmin } = useAuth()
  const [scripts, setScripts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scripts")
      return saved ? JSON.parse(saved) : initialScripts
    }
    return initialScripts
  })
  const [editingScript, setEditingScript] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("scripts", JSON.stringify(scripts))
    }
  }, [scripts])

  const handleDelete = (id: number) => {
    setScripts(scripts.filter((s) => s.id !== id))
  }

  const handleEdit = (script: any) => {
    setEditingScript({ ...script })
  }

  const handleSave = () => {
    if (editingScript.id) {
      setScripts(scripts.map((s) => (s.id === editingScript.id ? editingScript : s)))
    } else {
      setScripts([...scripts, { ...editingScript, id: Date.now() }])
    }
    setEditingScript(null)
    setShowAddDialog(false)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">Roblox Scripts</h1>
          <p className="text-gray-400">Popular scripts for various games and purposes</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowAddDialog(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Script
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {scripts.map((script, index) => (
          <motion.div
            key={script.id}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute -inset-2 bg-purple-600 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

            <Card className="relative bg-[#1a1a24] border-gray-800 hover:border-purple-600/50 transition-all h-full flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-purple-400 transition-colors">
                      {script.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-400 border-purple-600/30 text-xs"
                    >
                      {script.category}
                    </Badge>
                  </div>
                  {script.trending && (
                    <div className="flex items-center gap-1 text-xs text-orange-400 ml-2">
                      <TrendingUp className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-1">{script.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{script.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{script.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  {isAdmin ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(script)}
                        className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm text-xs h-8"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(script.id)}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 backdrop-blur-sm text-xs h-8"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => window.open(script.link, "_blank")}
                      className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm text-xs h-8"
                    >
                      <Code className="w-3 h-3 mr-1" />
                      View Script
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-[#1a1a24] border border-gray-800 rounded-lg p-8 text-center">
        <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Looking for Custom Scripts?</h2>
        <p className="text-gray-400 mb-6">Request custom scripts or contribute your own to the community</p>
        <Button
          variant="outline"
          className="border-purple-600/50 text-purple-400 hover:bg-purple-600/10 bg-transparent"
        >
          Submit a Script
        </Button>
      </div>

      <Dialog
        open={!!editingScript || showAddDialog}
        onOpenChange={() => {
          setEditingScript(null)
          setShowAddDialog(false)
        }}
      >
        <DialogContent className="bg-[#1a1a24] border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingScript?.id ? "Edit Script" : "Add New Script"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input
                value={editingScript?.name || ""}
                onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={editingScript?.category || ""}
                onChange={(e) => setEditingScript({ ...editingScript, category: e.target.value })}
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editingScript?.description || ""}
                onChange={(e) => setEditingScript({ ...editingScript, description: e.target.value })}
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Script Link</Label>
              <Input
                value={editingScript?.link || ""}
                onChange={(e) => setEditingScript({ ...editingScript, link: e.target.value })}
                placeholder="https://example.com/script"
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rating (0-5)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingScript?.rating || 0}
                  onChange={(e) => setEditingScript({ ...editingScript, rating: Number.parseFloat(e.target.value) })}
                  className="bg-[#0f0f17] border-gray-700"
                />
              </div>
              <div>
                <Label>Downloads</Label>
                <Input
                  value={editingScript?.downloads || ""}
                  onChange={(e) => setEditingScript({ ...editingScript, downloads: e.target.value })}
                  className="bg-[#0f0f17] border-gray-700"
                  placeholder="e.g., 1M+"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trending"
                checked={editingScript?.trending || false}
                onChange={(e) => setEditingScript({ ...editingScript, trending: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="trending">Trending</Label>
            </div>
            <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
