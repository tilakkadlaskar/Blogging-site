export interface Section {
  title?: string;
  content: string; // Supports basic HTML-like paragraphs or raw text
  codeBlock?: string;
  mathEq?: string; // LaTeX-like string representation
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  abstract: string;
  content: Section[];
  citationKey: string; // For BibTeX
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}