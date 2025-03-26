"use client";

import { useState } from "react";
import { PlusIcon, Trash2Icon, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { complaint } from "@/common/types";
import Modal from "@/components/Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/components/ui/ShowOneToastOnly";


type ComplaintData = Zod.infer<typeof complaint> & { images: File[] };

export default function ComplaintForm() {
  const [showComplaintForm, setShowComplaintForm] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<File[] | []>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm<ComplaintData>();

  const toggleModal = () => {
    setShowComplaintForm(!showComplaintForm);

    if (!showComplaintForm) {
      reset();
      setSelectedImages([]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    let updatedImages = [...selectedImages, ...newFiles];

    if (updatedImages.length > 5) {
      updatedImages = updatedImages.slice(-5);
    }

    setSelectedImages(updatedImages);
    setValue("images", updatedImages);
    console.log(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter(
      (_, i) => i !== index);
    setSelectedImages(updatedImages);
    setValue("images", updatedImages);
  };

  const submitComplaint = (data: ComplaintData) => {
    console.log(data)
   
    if(Object.entries(data).filter((field) => field[1] === "" ).length > 0) {
      showToast("All field is required", "error")
      return;
    }


    
    console.log(data);
  };

  // show only button...
  if (!showComplaintForm) {
    return (
      <Button
        className="w-fit absolute top-20 right-6 z-20"
        onClick={toggleModal}
      >
        <PlusIcon /> Raise New Complaint
      </Button>
    );
  }

  return (
    <Modal isOpen={showComplaintForm} onClose={toggleModal}>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Complaint</CardTitle>
          <CardDescription>
            Fill out the form to submit a new complaint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(submitComplaint)}>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="Enter the subject of your complaint"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Provide details about your complaint"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                defaultValue="low"
                onValueChange={(value) => {
                  setValue("type", value);
                }}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder={"Select priority"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Attach Images (Optional)</Label>
              <div className="relative flex items-center justify-center w-full h-16 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-secondary">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  multiple
                />
                <Upload className="w-6 h-6 text-primary" />
              </div>
              {selectedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 px-2">
                  {selectedImages.map((image, index) => {
                    const imageUrl = URL.createObjectURL(image);
                    return (
                      <div
                        key={image.name + "__" + image.size}
                        className="relative"
                      >
                        <img
                          src={imageUrl}
                          alt={image.name}
                          className="w-12 h-12 object-cover rounded-md border shadow-sm"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 text-red-500 p-1 backdrop-blur-md bg-secondary/85 rounded-full overflow-hidden"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Button className="w-full">Submit Complaint</Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
}
