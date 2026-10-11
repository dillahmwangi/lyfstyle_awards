
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.rpc(
      "get_vote_results"
    );

    if (error) throw error;

    return NextResponse.json(
      { results: data ?? [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Results API error:", error);

    return NextResponse.json(
      { error: "Unable to load voting results" },
      { status: 500 }
    );
  }
}
