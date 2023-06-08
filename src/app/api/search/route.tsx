import { UnsplashSearchResponse } from "@/models/unsplashImage";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided." }, { status: 400 });
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos/?query=${query}&client_id=${process.env.UnsplashKey}`
  );

  const { results }: UnsplashSearchResponse = await response.json();

  return NextResponse.json(results);
}

// next feature for http requests.
//export async function POST(request: Request) {}
//export async function DELETE(request: Request) {}
