import { SetStateAction } from "react";

export type Tag = {
  id: string;
  text: string;
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
