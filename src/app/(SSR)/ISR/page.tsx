import { UnsplashImage } from "@/models/unsplashImage";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Incremental Static Regeneration - nextjs 13",
};

// for dynamic page only this line
//export const revalidate = 15;

export default async function Dynamic() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UnsplashKey,
    {
      // more methods for dynamic
      //cache: "no-cache",
      next: { revalidate: 15 },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses<strong>Incremental Static Regeneration</strong>. A new
        page is fetched every 15 seconds after refreshing the page.
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
