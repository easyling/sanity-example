import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { Suspense } from "react";

import { client } from "@/sanity/client";
import LocaleSelector from "@/components/LocaleSelector";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  $localeFilter
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, locale}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { locale } = await searchParams;
  
  // Build the locale filter for the GROQ query
  const localeFilter = locale ? `&& locale == $locale` : '';
  const query = POSTS_QUERY.replace('$localeFilter', localeFilter);
  
  const posts = await client.fetch<SanityDocument[]>(
    query,
    locale ? { locale } : {},
    options
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <LocaleSelector />
      </Suspense>
      
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found for the selected locale.</p>
      ) : (
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => (
            <li className="hover:underline" key={post._id}>
              <Link href={`/${post.slug.current}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(post.publishedAt).toLocaleDateString()}
                  {post.locale && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                      {post.locale}
                    </span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}