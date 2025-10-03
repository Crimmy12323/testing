"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Shield, Star, AlertTriangle, Edit, Trash2, Plus, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialExecutors = [
  {
    id: 1,
    name: "Solara",
    description: "Premium executor with advanced features and regular updates.",
    rating: 4.8,
    status: "Free",
    isPaid: false,
    unc: 95,
    sunc: 92,
    features: ["Level 8 execution", "Custom UI", "Script hub", "Auto-update", "24/7 support"],
    link: "https://example.com/solara",
    videoUrl: "",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Synapse X",
    description: "Industry-leading executor with unmatched stability and performance.",
    rating: 4.9,
    status: "Premium",
    isPaid: true,
    unc: 98,
    sunc: 96,
    features: ["Level 9 execution", "Decompiler", "Script editor", "Premium support"],
    link: "https://example.com/synapse-x",
    videoUrl: "",
    imageUrl: "",
  },
]

export default function RobloxExecutors() {
  const { isAdmin } = useAuth()
  const [executors, setExecutors] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("executors")
      return saved ? JSON.parse(saved) : initialExecutors
    }
    return initialExecutors
  })
  const [editingExecutor, setEditingExecutor] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showcaseExecutor, setShowcaseExecutor] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("executors", JSON.stringify(executors))
    }
  }, [executors])

  const handleDelete = (id: number) => {
    setExecutors(executors.filter((e: any) => e.id !== id))
  }

  const handleEdit = (executor: any) => {
    setEditingExecutor({ ...executor })
  }

  const handleSave = () => {
    if (editingExecutor.id) {
      setExecutors(executors.map((e: any) => (e.id === editingExecutor.id ? editingExecutor : e)))
    } else {
      setExecutors([...executors, { ...editingExecutor, id: Date.now() }])
    }
    setEditingExecutor(null)
    setShowAddDialog(false)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Roblox Executors</h1>
            <p className="text-gray-400">Comprehensive guide to the best Roblox script executors</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setShowAddDialog(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Executor
            </Button>
          )}
        </div>
      </motion.div>

      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-yellow-400 font-semibold mb-1">Important Disclaimer</h3>
          <p className="text-gray-400 text-sm">
            Using script executors may violate Roblox&apos;s Terms of Service and could result in account bans. Use at
            your own risk and always download from official sources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {executors.map((executor: any, index) => (
          <motion.div
            key={executor.id}
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
                    <h3 className="text-white font-bold text-lg mb-0.5 truncate">{executor.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={
                          executor.isPaid
                            ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs"
                            : "bg-green-600/20 text-green-400 border-green-600/30 text-xs"
                        }
                      >
                        {executor.status}
                      </Badge>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {executor.unc}% UNC / {executor.sunc}% SUNC
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold text-sm">{executor.rating}</span>
                  </div>
                </div>

                {executor.imageUrl && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img
                      src={executor.imageUrl || "/placeholder.svg"}
                      alt={executor.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}

                <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-shrink-0">{executor.description}</p>

                <div className="space-y-1.5 mb-4 flex-1 mt-3">
                  {executor.features.slice(0, 3).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <Shield className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-400 truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 space-y-2">
                  {isAdmin ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(executor)}
                        className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm text-xs h-8"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(executor.id)}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 backdrop-blur-sm text-xs h-8"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => window.open(executor.link, "_blank")}
                        className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm text-xs h-8"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Get Executor
                      </Button>
                      {(executor.videoUrl || executor.imageUrl) && (
                        <Button
                          onClick={() => setShowcaseExecutor(executor)}
                          className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm text-xs h-8"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Watch Showcase
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={!!editingExecutor || showAddDialog}
        onOpenChange={() => {
          setEditingExecutor(null)
          setShowAddDialog(false)
        }}
      >
        <DialogContent className="bg-[#1a1a24] border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExecutor?.id ? "Edit Executor" : "Add New Executor"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input
                value={editingExecutor?.name || ""}
                onChange={(e) => setEditingExecutor({ ...editingExecutor, name: e.target.value })}
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editingExecutor?.description || ""}
                onChange={(e) => setEditingExecutor({ ...editingExecutor, description: e.target.value })}
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Download Link</Label>
              <Input
                value={editingExecutor?.link || ""}
                onChange={(e) => setEditingExecutor({ ...editingExecutor, link: e.target.value })}
                placeholder="https://example.com/executor"
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Video URL (optional)</Label>
              <Input
                value={editingExecutor?.videoUrl || ""}
                onChange={(e) => setEditingExecutor({ ...editingExecutor, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-[#0f0f17] border-gray-700"
              />
            </div>
            <div>
              <Label>Image URL (optional)</Label>
              <Input
                value={editingExecutor?.imageUrl || ""}
                onChange={(e) => setEditingExecutor({ ...editingExecutor, imageUrl: e.target.value })}
                placeholder="https://example.com/image.png"
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
                  value={editingExecutor?.rating || 0}
                  onChange={(e) =>
                    setEditingExecutor({ ...editingExecutor, rating: Number.parseFloat(e.target.value) })
                  }
                  className="bg-[#0f0f17] border-gray-700"
                />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={editingExecutor?.status || "Free"}
                  onChange={(e) =>
                    setEditingExecutor({
                      ...editingExecutor,
                      status: e.target.value,
                      isPaid: e.target.value === "Premium",
                    })
                  }
                  className="w-full bg-[#0f0f17] border border-gray-700 rounded-md px-3 py-2 text-white"
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>UNC Compatibility (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={editingExecutor?.unc || 0}
                  onChange={(e) => setEditingExecutor({ ...editingExecutor, unc: Number.parseInt(e.target.value) })}
                  className="bg-[#0f0f17] border-gray-700"
                />
              </div>
              <div>
                <Label>SUNC Compatibility (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={editingExecutor?.sunc || 0}
                  onChange={(e) => setEditingExecutor({ ...editingExecutor, sunc: Number.parseInt(e.target.value) })}
                  className="bg-[#0f0f17] border-gray-700"
                />
              </div>
            </div>
            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                value={editingExecutor?.features?.join("\n") || ""}
                onChange={(e) =>
                  setEditingExecutor({
                    ...editingExecutor,
                    features: e.target.value.split("\n").filter((f) => f.trim()),
                  })
                }
                placeholder="Level 8 execution&#10;Custom UI&#10;Script hub&#10;Auto-update"
                className="bg-[#0f0f17] border-gray-700 min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
            </div>
            <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showcaseExecutor} onOpenChange={() => setShowcaseExecutor(null)}>
        <DialogContent className="bg-[#1a1a24] border-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{showcaseExecutor?.name} Showcase</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {showcaseExecutor?.videoUrl ? (
              <div className="aspect-video">
                <iframe
                  src={showcaseExecutor.videoUrl.replace("watch?v=", "embed/")}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={`${showcaseExecutor.name} showcase`}
                />
              </div>
            ) : showcaseExecutor?.imageUrl ? (
              <img
                src={showcaseExecutor.imageUrl || "/placeholder.svg"}
                alt={`${showcaseExecutor.name} showcase`}
                className="w-full rounded-lg"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
