"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import DatePicker from "../../Inputs/DatePicker/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { addJournal } from "@/api/journalData";
/* import { getUserLoginInfo } from "@/api/userAuthentication"; */
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
import { DecodedToken } from "@/api/userAuthentication";
import { SelectInput } from "../../Inputs/SelectInput";
import { TagInput } from "../../Inputs/TagInput";
import { Tag } from "@/models/journalModels";
import useSWR from "swr";
import { API_BASE_URL } from "@/api/baseApiUrl";
import { useDrawerStore } from "@/store/useDrawerStore";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  content: z.string(),
  date: z.string(),
  mood: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

const AddJournalForm = () => {
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
  const { openDrawer, setOpenDrawer } = useDrawerStore();
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

  const { setValue } = form;
  const { mutate, data } = useSWR(`${API_BASE_URL}/api/journal`);
  const { toast } = useToast();

  async function onFormSubmit() {
    try {
      const result = await addJournal({
        userId,
        title,
        content,
        date,
        mood,
        tags,
      });
      mutate(result, {
        optimisticData: [...data, "New Item"],
        populateCache: true,
      });
      setOpenDrawer(!openDrawer);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can also show an error message to the user if needed.
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  useEffect(() => {
    console.log(userId, title, content, date, mood, tags);
  }, [userId, title, content, date, mood, tags]);

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
    // @ts-ignore
  }, [decodedToken]);

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5 max-w-3xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit();
          }}
        >
          {/* Journal Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Journal Title here..."
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
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center w-full">
            {/* Date */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-grow">
                  <FormLabel className="mb-1 mt-2">Date</FormLabel>
                  <FormControl>
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
                <FormItem className="flex-grow">
                  <FormLabel>Mood</FormLabel>
                  <FormControl>
                    <SelectInput />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-x-10 sm:space-y-0 ">
            {/* Tags */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a topic"
                      tags={tags}
                      className="sm:min-w-[450px]"
                      setTags={(newTags) => {
                        setTags(newTags);
                        setValue("tags", newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit button */}
          <div className="w-full flex justify-center ">
            <Button
              className="bg-transparent hover:underline text-md rounded-full p-6 shadow-none text-dark-purple hover:bg-transparent"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full p-6 "
              type="submit"
            >
              Add Journal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddJournalForm;