import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import franken from "franken-ui/plugin-vite";
import chart from "franken-ui/extensions/chart";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import { visit } from "unist-util-visit";

function plugin() {
  const classMap = {
    a: "uk-link",
    h1: "uk-h1",
    h2: "uk-h2 mt-10",
    h3: "uk-h3 mt-10",
    h4: "uk-h4 mt-10",
    p: "uk-paragraph",
    table: "uk-table uk-table-divider uk-table-responsive mt-10",
    ul: "uk-list uk-list-bullet mt-6",
    hr: "uk-divider-icon mt-10",
  };

  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code") {
        const isInlineCode = !node.parent || node.parent.tagName !== "pre";

        if (isInlineCode) {
          node.properties.className = [
            "uk-codespan",
            ...(node.properties.className || []),
          ];
        }

        return;
      }

      if (node.tagName === "a") {
        node.properties.className = [
          "uk-link",
          ...(node.properties.className || []),
        ];
      }

      if (classMap[node.tagName]) {
        node.properties.className = [
          ...(node.properties.className || []),
          classMap[node.tagName],
        ];
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    expressiveCode({
      frames: {
        showCopyToClipboardButton: false,
      },
    }),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [plugin],
  },
  vite: {
    plugins: [
      tailwindcss(),
      franken({
        preflight: false,
        layer: true,
        layerExceptions: ["chart"],
        extensions: [[chart, {}]],
      }),
    ],
  },
});
