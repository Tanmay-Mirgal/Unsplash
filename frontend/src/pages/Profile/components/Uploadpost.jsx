import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { Textarea } from "@/components/components/ui/textarea";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { usePostStore } from "../../../Store/usePostStore";

const UploadPost = ({ open, onOpenChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: "",
    location: ""
  });

  const { createPost, isLoading, isError, error } = usePostStore();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("image", file);
      } else {
        console.error("No file selected");
      }
      const response = await createPost(formData);
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Upload a photo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!preview ? (
            <div className="border-2 border-dashed rounded-lg p-8">
              <input type="file" onChange={handleFileInput} className="w-full" />
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearPreview}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Photo Title</Label>
              <Input
                id="title"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="Give your photo a title"
                className="mt-1 w-full"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={postData.description}
                onChange={handleInputChange}
                placeholder="Tell the story behind your photo"
                className="mt-1 w-full"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={postData.tags}
                onChange={handleInputChange}
                placeholder="Add tags (separated by commas)"
                className="mt-1 w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add up to 25 tags to describe your photo
              </p>
            </div>

            <div>
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                value={postData.location}
                onChange={handleInputChange}
                placeholder="Where was this photo taken?"
                className="mt-1 w-full"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Submit Photo"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPost;

