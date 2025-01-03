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
    location: "",
    image: "",
  });
  const { createPost, isLoading,posts } = usePostStore();

  // Drag & drop handlers
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

  // File input handler
  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  // Handle the image file
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

  // Clear the preview
  const clearPreview = () => {
    setPreview(null);
    setFile(null);
  };

  // Handle text input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append text data to formData
      Object.entries(postData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append the image file if it's selected
      if (file) {
        formData.append("image", file);
      }

      await createPost(formData);
      onOpenChange(false); // Close the dialog on successful submission
    } catch (error) {
      console.error("Error submitting post:", error);
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
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } transition-colors duration-200`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-lg mb-2">Drag and drop your photo here</div>
              <div className="text-sm text-gray-500 mb-4">or</div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileInput}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Select from computer
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg"
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 overflow-y-auto max-h-80">
              <div>
                <Label htmlFor="title">Photo Title</Label>
                <Input
                  id="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="Give your photo a title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={postData.description}
                  onChange={handleInputChange}
                  placeholder="Tell the story behind your photo"
                  className="mt-1"
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
                  className="mt-1"
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
                  className="mt-1"
                />
              </div>
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

