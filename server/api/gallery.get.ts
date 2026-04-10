import { readdir } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const category = query.category as string;
  const offset = Number(query.offset) || 0;
  const limit = Number(query.limit) || 6;

  const basePath = join(process.cwd(), "public/img/gallery", category);

  let files: string[] = [];

  try {
    files = await readdir(basePath);
  } catch (e) {
    return {
      images: [],
      hasMore: false,
    };
  }

  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .slice(offset, offset + limit)
    .map((file, index) => ({
      id: offset + index,
      src: `/img/gallery/${category}/${file}`,
      alt: category,
    }));

  return {
    images,
    hasMore: offset + limit < files.length,
  };
});
