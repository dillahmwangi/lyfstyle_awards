
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getOrCreateVoterId } from "@/lib/voter";

export async function POST(request: NextRequest) {
  try {
    // Basic cross-origin request protection
    if (
      request.headers.get("origin") !==
      request.nextUrl.origin
    ) {
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const { categoryId, contestantName, comment } = body;

    if (
      typeof categoryId !== "string" ||
      typeof contestantName !== "string" ||
      (comment !== undefined && typeof comment !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid vote data" },
        { status: 400 }
      );
    }

    const name = contestantName.trim().replace(/\s+/g, " ");
    const reason = (comment ?? "").trim();

    if (
      !name ||
      name.length > 100 ||
      reason.length > 300
    ) {
      return NextResponse.json(
        { error: "Invalid contestant name or comment" },
        { status: 400 }
      );
    }

    const { data: category, error: categoryError } =
      await supabase
        .from("categories")
        .select("id")
        .eq("id", categoryId)
        .maybeSingle();

    if (categoryError) throw categoryError;

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    const voterId = await getOrCreateVoterId();

    const { error } = await supabase
      .from("votes")
      .insert({
        voter_id: voterId,
        category_id: categoryId,
        contestant_name: name,
        contestant_key: name.toLocaleLowerCase("en"),
        comment: reason || null,
      });

    if (error?.code === "23505") {
      return NextResponse.json(
        {
          error: "You have already voted in this category.",
        },
        { status: 409 }
      );
    }

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        message: "Vote recorded successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vote error:", error);

    return NextResponse.json(
      { error: "Unable to submit vote" },
      { status: 500 }
    );
  }
}
