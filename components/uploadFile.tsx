"use client";
import { useState } from "react";
import { storage } from "@/lib/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/*
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "@/components/ui/file-upload";
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadFileProps {
  setUrl: (url: string) => void;
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (e: any) => void;
  setValue: any;
}

export const UploadFile = ({
  setUrl,
  onChange,
  value,
  setValue,
}: UploadFileProps) => {
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `images/${Date.now().toString().slice(7)}_${file.name}`
    ); // Customize path as needed
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("imageUrl", downloadURL);
          value = downloadURL;
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      {/* <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
        <FileUploadDropzone
          label="Drag and drop here to upload"
          description=".png, .jpg up to 5MB"
        />
        <FileUploadList />
      </FileUploadRoot> */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      <div className="text-sm">
        {progress > 0 && progress < 100 ? (
          <p>{`Upload Progress: ${progress}%`}</p>
        ) : progress !== 0 ? (
          <p>Upload Successfully</p>
        ) : null}
      </div>
    </div>
  );
};
