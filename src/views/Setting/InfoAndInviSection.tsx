"use client";
import Dialog from "@/components/Dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/services/client/useAuthStore";
import { useUploadImage } from "@/services/server/upload/mutation";
import { useUpdateProfile } from "@/services/server/user/mutation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
interface Props {
  label?: string;
  description?: string;
  data?: any;
  submit: (values: any) => void;
}
function FormUpdateProfile({
  description = "",
  label = "",
  data,
  submit,
}: Props) {
  const keyField = Object.keys(data);
  const form = useForm({
    values: data,
  });
  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <FormField
            control={form.control}
            name={keyField[0]}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="block w-full" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

function InfoAndInviSection() {
  const { userInfo, clientId } = useAuthStore();
  const profile = useUpdateProfile();
  const [imageUrl, setImageUrl] = useImmer<string>("");
  function onSubmit(values: any) {
    console.log(values);
    if (clientId) {
      profile
        .mutateAsync({ userId: clientId, payload: values })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const uploadImage = useUploadImage();
  return (
    <div className="w-full">
      <Dialog
        title="Update your name"
        description="This name will show stay blog, question and comment me!!"
        content={
          <FormUpdateProfile
            label="Name"
            data={{ usr_name: userInfo?.usr_name }}
            submit={onSubmit}
          />
        }
      >
        <DialogTrigger className="w-full">
          <Button variant="outline" className="w-full justify-start h-18">
            <div className="flex justify-between w-full items-center">
              <div>
                <p className="font-bold">Name</p>
                <p>{userInfo?.usr_name}</p>
              </div>
              <ChevronRight />
            </div>
          </Button>
        </DialogTrigger>
      </Dialog>
      <Dialog
        title="Update your customer"
        description="This name  @ will show stay blog, question and comment me!!"
        content={
          <FormUpdateProfile
            label="Slug"
            data={{ usr_name: userInfo?.usr_slug }}
            submit={onSubmit}
          />
        }
      >
        <DialogTrigger className="w-full">
          <Button variant="outline" className="my-3 w-full justify-start h-18">
            <div className="flex justify-between w-full items-center">
              <div>
                <p className="font-bold">Slug</p>
                <p>{userInfo?.usr_slug}</p>
              </div>
              <ChevronRight />
            </div>
          </Button>
        </DialogTrigger>
      </Dialog>
      <Dialog
        title="Update avatar customer"
        description="This name  @ will show stay blog, question and comment me!!"
        content={
          <div>
            {imageUrl !== "" && (
              <div className="flex justify-center w-full">
                <Image
                  height={300}
                  width={300}
                  className="rounded-full object-contain"
                  alt="avatar"
                  src={imageUrl}
                />
              </div>
            )}
            <div className="w-full">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                onChange={(value) => {
                  const file = value.target.files;
                  if (file && file.length > 0) {
                    uploadImage
                      .mutateAsync(file[0])
                      .then((data) => {
                        console.log(data);
                        setImageUrl(data.metadata.url);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    // const url = URL.createObjectURL(file[0]);
                    // setImageUrl(url);
                  }
                  console.log(value.target.files);
                }}
              />
            </div>
            {imageUrl !== "" && (
              <Button
                className="block w-full"
                onClick={() => {
                  onSubmit({ usr_avatar: imageUrl });
                }}
              >
                Save
              </Button>
            )}
          </div>
        }
      >
        <DialogTrigger className="w-full">
          <Button variant="outline" className="w-full justify-start h-18">
            <div className="flex justify-between w-full items-center">
              <div>
                <p className="font-bold">Avatar</p>
                <Avatar>
                  <AvatarImage src={userInfo?.usr_avatar} />
                </Avatar>
              </div>
              <ChevronRight />
            </div>
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}

export default InfoAndInviSection;
