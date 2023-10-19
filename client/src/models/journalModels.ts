export interface IJournalEntry {
  userId: string;
  title: string;
  content: string;
  date: Date | undefined;
  mood: string;
  tags: string[];
}
