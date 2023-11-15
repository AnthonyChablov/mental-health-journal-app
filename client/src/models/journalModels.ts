import { SetStateAction } from "react";

export type Tag = {
  id: string;
  text: string;
};

export type IJournalFilter = {
  mode: "asc" | "desc" | "clear" | undefined;
};

export interface IJournalEntry {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  date: Date | undefined;
  mood: string;
  tags: Tag[];
}
