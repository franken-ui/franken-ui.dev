import { readdirSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";

export interface Metadata {
  id: string;
  text: string;
  title: string;
  description: string;
  frame: {
    height: number;
  };
  [key: string]: any;
}

export interface Snippet {
  category: string;
  slug: string;
  metadata: Metadata;
}

/**
 * Reads all snippet directories and returns structured data
 * @returns Array of snippet items with category, slug, and metadata
 */
export function readSnippetDirectories(): Snippet[] {
  const SNIPPETS_DIR = resolve("src", "snippets_pages", "2.1");

  const snippets: Snippet[] = [];

  for (const category of readdirSync(SNIPPETS_DIR)) {
    const categoryPath = join(SNIPPETS_DIR, category);

    // Skip if not a directory
    if (!statSync(categoryPath).isDirectory()) {
      continue;
    }

    for (const slug of readdirSync(categoryPath)) {
      const slugPath = join(categoryPath, slug);

      // Skip if not a directory
      if (!statSync(slugPath).isDirectory()) {
        continue;
      }

      // Check if the subdirectory has metadata.json
      if (!readdirSync(slugPath).includes("metadata.json")) {
        continue;
      }

      const metadata: Metadata = JSON.parse(
        readFileSync(join(slugPath, "metadata.json"), "utf-8"),
      );

      snippets.push({
        category,
        slug,
        metadata,
      });
    }
  }

  return snippets;
}

/**
 * Gets all categories with their slugs and metadata
 * @returns Object with categories as keys and arrays of slugs with metadata as values
 */
export function getCategorizedSnippets(): Record<
  string,
  Array<{ slug: string; metadata: Metadata }>
> {
  const snippets = readSnippetDirectories();

  const categorized: Record<
    string,
    Array<{ slug: string; metadata: Metadata }>
  > = {};

  for (const snippet of snippets) {
    if (!categorized[snippet.category]) {
      categorized[snippet.category] = [];
    }

    categorized[snippet.category].push({
      slug: snippet.slug,
      metadata: snippet.metadata,
    });
  }

  return categorized;
}
