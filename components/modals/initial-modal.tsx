"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UploadFile } from "@/components/uploadFile";
import Image from "next/image";
import axios from "axios";

import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

const InitialModal = () => {
  {
    /*below code is injecting because we face Hydration error of UI,cause we use Modal in web Page */
  }
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const router = useRouter();

  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("Image Url : ", imageUrl);
  }, [imageUrl]);

  const isLoading = form.formState.isSubmitting;

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values: ", values);
    try {
      await axios.post(`/api/servers/${user?.id}`, values);

      form.reset();
      router.refresh();
      // window.location.reload();
    } catch (error) {
      console.error("Error in form submission", error);
    }
  };

  {
    /*below code is injecting because we face Hydration error of UI,cause we use Modal in web Page */
  }
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open>
        <DialogContent className="bg-white text-black p-1 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Customize your Server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your Server a Personality with a name and an image.You can
              always change it later
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex text-center items-center justify-center font-bold">
                  TODO: Image Upload
                </div>
                {imageUrl === "" ? (
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-800 dark:text-secondary/70">
                          Upload File
                        </FormLabel>
                        <FormControl>
                          <UploadFile
                            setValue={form.setValue}
                            setUrl={setImageUrl}
                            value={field.value}
                            onChange={field.onChange}
                            endpoint="serverImage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="relative ">
                      <Image
                        width={100}
                        height={100}
                        src={imageUrl}
                        alt="Uploaded Image"
                        className="rounded-lg"
                      />
                      <button
                        onClick={() => {
                          form.setValue("imageUrl", "");
                          setImageUrl("");
                        }}
                        className="bg-rose-600 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm font-bold text-zinc-800 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                          placeholder="Enter Server Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-200 px-6 py-4">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Create Server
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitialModal;
