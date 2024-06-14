import { defineStore } from "pinia";
import type { DetailedQuote, Quote } from "@/types/quoteTypes";

export type QuoteActions = {
  onCreateQuote: (quote: Quote | DetailedQuote) => void;
  onEditQuote: (quote: Quote) => void;
  onDeleteQuote: (quoteId: number) => void;
  clearEmptyNotifications: (quoteId: number) => void;
};

export const useQuoteActions = defineStore("quoteActions", {
  state: (): QuoteActions => ({
    onCreateQuote: () => {},
    onEditQuote: () => {},
    onDeleteQuote: () => {},
    clearEmptyNotifications: () => {},
  }),
});
