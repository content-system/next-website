import fs from "fs/promises";
import { marked, Renderer, Tokens } from "marked";
import path from "path";

export async function getData<T>(id: string): Promise<T> {
  const filepath = path.join(process.cwd(), "data", id + ".json");
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data) as any;
}

function renderImage(img: Tokens.Image): string {
  if (!img.href) return "" // If no src, return empty string

  let imgTag = `<img src="${img.href}" alt="${img.text}"`
  if (img.title) {
    imgTag += ` title="${img.title}"`
  }
  imgTag += "/>" // Not self-closing
  return imgTag
}
const renderer = new Renderer()
renderer.image = renderImage
marked.setOptions({ renderer })

export async function getStaticMarkdown(slug: string): Promise<string> {
  const filepath = path.join(process.cwd(), "content", slug, "README.md")
  const content = await fs.readFile(filepath, "utf8");

  marked.setOptions({ renderer });
  const html = marked(content).toString()

  return html;
}
