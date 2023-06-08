import { UnsplashImage } from "@/models/unsplashImage";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";
import styles from "./TopicPage.module.css";
import { isFunctionDeclaration } from "typescript";
import { Metadata } from "next";

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - nextjs 13",
  };
}

// cannot access any topics besides generateStaticParams.
//export const dynamicParams = false;

interface PageProps {
  params: { topic: string };
  // searchParams after ? in url usually for quering.
  //searchParams: { [key: string]: string | string[] | undefined };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function DynamicRouting({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UnsplashKey}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => {
        return (
          <Image
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description}
            key={image.urls.raw}
            className={styles.image}
          />
        );
      })}
    </div>
  );
}
