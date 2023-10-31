"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import DatePicker from "../../DatePicker/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { addJournal } from "@/api/journalData";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { useJournalStore } from "@/store/useJournalStore";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { IJournalEntry } from "@/models/journalModels";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "@/api/userAuthentication";
import { editJournal } from "@/api/journalData";

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

  function onFormSubmit() {
    editJournal(journalId, { userId, title, content, date, mood, tags });
  }

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
    console.log(userId, title, content, date, mood, tags);
  }, [userId, title, content, date, mood, tags]);
  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5"
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
              <FormItem className="text-left ">
                <FormLabel className="">Title</FormLabel>
                <FormControl>
                  <Input
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
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
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
          {/* Date */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col text-left">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-x-10 sm:space-y-0 ">
            {/* Tags */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow text-left">
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={tags[0] || "Enter Tag Here"}
                      onChange={(e) => {
                        setTags([...tags, e.target.value]);
                      }}
                    />
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
                  <FormLabel>Mood</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={mood}
                      onChange={(e) => {
                        setMood(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit button */}
          <Button
            className="bg-dark-purple hover:bg-dark-purple-brown text-md rounded-full w-full p-6 "
            type="submit"
          >
            Update Journal
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateJournalForm;
