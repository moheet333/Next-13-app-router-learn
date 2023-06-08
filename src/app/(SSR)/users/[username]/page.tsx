import { notFound } from "next/navigation";
import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UnsplashKey}`
  );

  if (response.status === 404) {
    notFound();
  }

  return response.json();
}

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - nextjs 13",
  };
}

interface PageProps {
  params: { username: string };
}

export default async function Users({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username} target="_blank">
        Unsplash profile
      </a>
    </div>
  );
}
