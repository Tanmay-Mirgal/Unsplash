import { useState, useRef } from "react";
import { useUserStore } from "../../Store/useUserStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { Textarea } from "@/components/components/ui/textarea";
import { Button } from "@/components/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
    const { updateUserProfile, isLoading } = useUserStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        bio: '',
        location: '',
        website: '',
        instagram: '',
        twitter: '',
        facebook: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const data = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                data.append(key, value || '');
            }

            if (file) {
                data.append('profilePic', file);
            }

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            };

            console.log("Sending request with data:", data);
            const response = await axios.put("http://localhost:5000/api/auth/update-profile", data, config);
            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 md:px-4 md:py-8 md:flex md:flex-col">
            <div className="md:max-w-4xl md:mx-auto md:py-8 md:px-4">
                <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
                <Tabs defaultValue="profile" className="space-y-6 md:space-y-12">
                    <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 space-x-8 md:space-x-12">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none pb-4 md:pb-8"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none pb-4 md:pb-8"
                        >
                            Account Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6 md:space-y-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>
                                    Upload a picture to help people recognize you
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-6 md:space-x-12">
                                    <div className="relative">
                                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="avatar-upload"
                                            ref={fileInputRef}
                                            onChange={handleAvatarChange}
                                        />
                                        <Button asChild variant="outline" className="mr-2">
                                            <Label htmlFor="avatar-upload" className="cursor-pointer">
                                                <Camera className="h-4 w-4 mr-2" />
                                                Upload new picture
                                            </Label>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="text-red-500 hover:text-red-600"
                                            onClick={handleRemoveImage}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    Update your personal information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 md:space-y-8">
                                <div className="grid grid-cols-2 gap-4 md:gap-8">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your first name"
                                            className="text-black"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name"
                                            className="text-black"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter your username"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about yourself"
                                        rows={4}
                                        className="text-black"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Links</CardTitle>
                                <CardDescription>
                                    Add links to your profiles or websites
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 md:space-y-8">
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Your location"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        value={formData.instagram}
                                        onChange={handleInputChange}
                                        placeholder="https://instagram.com/yourprofile"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Input
                                        id="twitter"
                                        value={formData.twitter}
                                        onChange={handleInputChange}
                                        placeholder="https://twitter.com/yourprofile"
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <Input
                                        id="facebook"
                                        value={formData.facebook}
                                        onChange={handleInputChange}
                                        placeholder="https://facebook.com/yourprofile"
                                        className="text-black"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="sticky bottom-0 bg-white border-t mt-8 -mx-4 px-4 py-4 flex justify-end space-x-4">
                    <Button variant="outline">Cancel</Button>
                    <Button
                        onClick={handleSaveChanges}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;

