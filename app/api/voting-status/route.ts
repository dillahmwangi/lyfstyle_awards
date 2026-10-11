
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getVoterId } from "@/lib/voter";

export async function GET() {
  try {
    const voterId = await getVoterId();

    if (!voterId) {
      return NextResponse.json({
        votedCategories: [],
      });
    }

    const { data, error } = await supabase
      .from("votes")
      .select("category_id")
      .eq("voter_id", voterId);

    if (error) throw error;

    return NextResponse.json({
      votedCategories:
        data?.map((vote) => vote.category_id) ?? [],
    });
  } catch (error) {
    console.error("Voting status error:", error);

    return NextResponse.json(
      { error: "Unable to load voting status" },
      { status: 500 }
    );
  }
}
