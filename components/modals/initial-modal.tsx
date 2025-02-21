"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UploadFile } from "@/components/uploadFile";

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
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    console.log("Image Url : ", imageUrl);
  }, [imageUrl]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex text-center items-center justify-center font-bold">
                  TODO: Image Upload
                </div>
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
                          disabled={isLoading}
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
                <Button variant="primary" disabled={isLoading}>
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
