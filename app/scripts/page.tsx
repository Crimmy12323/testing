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
import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Scripts() {
  const { isAdmin } = useAuth()
  const [scripts, setScripts] = useState<any[]>([])
  const [editingScript, setEditingScript] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScripts()
  }, [])

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabase.from("scripts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setScripts(data || [])
    } catch (error) {
      console.error("[v0] Error fetching scripts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("scripts").delete().eq("id", id)

      if (error) throw error
      setScripts(scripts.filter((s) => s.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting script:", error)
    }
  }

  const handleEdit = (script: any) => {
    setEditingScript({ ...script })
  }

  const handleSave = async () => {
    try {
      if (editingScript.id) {
        const { error } = await supabase
          .from("scripts")
          .update({
            name: editingScript.name,
            category: editingScript.category,
            description: editingScript.description,
            rating: editingScript.rating,
            downloads: editingScript.downloads,
            trending: editingScript.trending,
            link: editingScript.link,
          })
          .eq("id", editingScript.id)

        if (error) throw error
        setScripts(scripts.map((s) => (s.id === editingScript.id ? editingScript : s)))
      } else {
        const { data, error } = await supabase
          .from("scripts")
          .insert({
            name: editingScript.name,
            category: editingScript.category,
            description: editingScript.description,
            rating: editingScript.rating,
            downloads: editingScript.downloads,
            trending: editingScript.trending,
            link: editingScript.link,
          })
          .select()
          .single()

        if (error) throw error
        setScripts([data, ...scripts])
      }
      setEditingScript(null)
      setShowAddDialog(false)
    } catch (error) {
      console.error("[v0] Error saving script:", error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="text-center text-gray-400">Loading scripts...</div>
      </div>
    )
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

            <Card className="relative bg-[#1a1a24] border-gray-800 hover:border-purple-600/50 transition-all h-[200px] flex flex-col">
              <CardContent className="p-3 flex flex-col h-full">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-white font-bold text-lg truncate flex-1 group-hover:text-purple-400 transition-colors">
                    {script.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold text-sm">{script.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-purple-600/30 text-purple-300 border-purple-600/50 text-xs font-semibold"
                  >
                    {script.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Download className="w-3 h-3" />
                    <span>{script.downloads}</span>
                  </div>
                  {script.trending && (
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-400 text-xs mb-2 line-clamp-2 flex-1">{script.description}</p>

                <div className="mt-auto pt-6">
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
