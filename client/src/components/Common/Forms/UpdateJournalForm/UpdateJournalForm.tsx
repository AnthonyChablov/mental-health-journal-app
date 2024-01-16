"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import DatePicker from "../../Inputs/DatePicker/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useJournalStore } from "@/store/useJournalStore";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "@/apiClient/userAuthentication";
import { editJournal } from "@/apiClient/journalData";
import { SelectInput } from "../../Inputs/SelectInput";
import { TagInput } from "../../Inputs/TagInput";
import useSWR from "swr";
import { useModalStore } from "@/store/useModalStore";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { throttle } from "lodash";
import { useDrawerStore } from "@/store/useDrawerStore";

const formSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  content: z.string(),
  date: z.string(),
  mood: z.string(),
  tags: z.array(z.string()),
});

const UpdateJournalForm = () => {
  /* Router */
  const params = useParams();
  const journalId = String(params.journalId);

  /* Actions */
  const { data: session } = useSession();

  // State
  const {
    userId,
    title,
    content,
    date,
    mood,
    tags,
    setUserId,
    setTitle,
    setContent,
    setDate,
    setMood,
    setTags,
  } = useJournalStore();
  const { setOpenDrawer } = useDrawerStore();
  const { toggleEditModal, setToggleEditModal } = useModalStore();
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  // Form Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      title: "",
      content: "",
      date: "",
      mood: "",
      tags: [],
    },
  });

  /* Variables */
  const { setValue } = form;
  const { mutate, data } = useSWR(`${journalId}`);
  const { toast } = useToast();

  /* Functions */
  async function onFormSubmit() {
    try {
      const result = await editJournal(session?.user?.id, journalId, {
        userId,
        title,
        content,
        date,
        mood,
        tags,
      });

      if (data) {
        // If data exists, mutate the updated journal object
        const updatedData = { ...data, ...result };
        mutate(updatedData, true);
      } else {
        // If data doesn't exist yet, set the result as the initial data
        mutate(result, true);
      }
      setToggleEditModal(!toggleEditModal);
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  // Throttle add journal form submit, for 3 seconds
  const throttledOnFormSubmit = throttle(onFormSubmit, 3000);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authorizationToken");
    if (storedAuthToken) {
      try {
        const decoded: DecodedToken = jwtDecode(
          storedAuthToken.replace("Bearer ", "")
        );
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Access userId after decodedToken has been set
    if (decodedToken) {
      setUserId(decodedToken?.user);
    }
  }, [decodedToken]);

  useEffect(() => {
    if (session && session?.user?.id) {
      setUserId(session?.user?.id);
    }
  }, [session]);

  useEffect(() => {
    console.log(userId, title, content, date, mood, tags);
  }, [userId, title, content, date, mood, tags]);

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            throttledOnFormSubmit();
          }}
        >
          {/* Journal Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="text-left ">
                <FormLabel className="text-base">Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-base"
                    type="text"
                    placeholder={title}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value); // Update the `title` state with the input value
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Journal Content */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="text-base">Content</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-base"
                    placeholder={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-x-10 sm:space-y-0 ">
            {/* Date */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col text-left">
                  <FormLabel className="my-1 text-base">Date</FormLabel>
                  <FormControl className="">
                    <DatePicker />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Moods */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow text-left ">
                  <FormLabel className="text-base">Mood</FormLabel>
                  <FormControl>
                    <SelectInput fitWidth={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            {/* Tags */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow text-left">
                  <FormLabel className="text-base">Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a topic"
                      tags={tags}
                      className="sm:min-w-[450px] text-base"
                      setTags={(newTags) => {
                        setTags(newTags);

                        // Check if newTags is a function
                        const updatedTags =
                          typeof newTags === "function"
                            ? newTags(tags)
                            : newTags;

                        // Map Tag objects to an array of strings
                        const tagNames = updatedTags.map((tag) => tag.text);

                        setValue("tags", tagNames);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center ">
            {/* Submit button */}
            <Button
              className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full w-full p-6 "
              type="submit"
            >
              Update Journal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateJournalForm;
