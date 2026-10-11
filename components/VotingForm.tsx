"use client";

import { useState } from "react";

type VotingFormProps = {
  categoryId: string;
  lifestyle: string;
  onBack: () => void;
   onVoteSuccess?: (categoryId: string) => void;
};

export default function VotingForm({
  categoryId,
  lifestyle,
  onBack,
   onVoteSuccess,
}: VotingFormProps) {
  const [contestantName, setContestantName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  if (!contestantName.trim() || loading) return;

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId,
        contestantName: contestantName.trim(),
        comment: comment.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to vote");
    }

    setSubmitted(true);
    onVoteSuccess?.(categoryId);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
}

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Vote submitted!
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-6 text-gray-500">
              Thank you for voting for{" "}
              <span className="font-semibold text-gray-900">
                {contestantName.trim()}
              </span>{" "}
              in {lifestyle}.
            </p>

            {comment.trim() && (
              <div className="mx-auto mt-6 max-w-lg rounded-2xl bg-gray-50 p-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Your comment
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {comment}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={onBack}
              className="mt-8 w-full rounded-2xl bg-purple-600 px-5 py-4 font-bold text-white transition hover:bg-purple-700 active:scale-[0.98] sm:w-auto sm:min-w-64"
            >
              Vote in another lifestyle
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <span className="text-xl">←</span>
            <span>Back</span>
          </button>

          <div className="text-sm font-bold tracking-tight text-purple-700 sm:text-base">
            ✦ LIFESTYLE AWARDS
          </div>

          <div className="w-14" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
            {lifestyle}
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who are you voting for?
          </h1>

          <p className="mx-auto mt-3 max-w-xl leading-6 text-gray-500">
            Type the name of the person you think deserves to win this
            lifestyle award.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white p-5 shadow-sm sm:mt-10 sm:p-8"
        >
          {/* Contestant */}
          <div>
            <label
              htmlFor="contestant"
              className="text-sm font-bold text-gray-800"
            >
              Contestant name
            </label>

            <input
              id="contestant"
              type="text"
              value={contestantName}
              onChange={(event) => setContestantName(event.target.value)}
              placeholder="e.g. Jane Wanjiku"
              autoComplete="off"
              required
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-black outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 sm:text-lg"
/>
            <p className="mt-2 text-xs text-gray-400">
              Enter the contestant&apos;s name as you know it.
            </p>
          </div>

          {/* Comment */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <label
                htmlFor="comment"
                className="text-sm font-bold text-gray-800"
              >
                Reason
              </label>

              <span className="text-xs text-gray-400">Optional</span>
            </div>

            <textarea
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Why do you think they deserve this award?"
              rows={5}
              maxLength={300}
             className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-black outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"

            />

            <div className="mt-2 text-right text-xs text-gray-400">
              {comment.length}/300
            </div>
          </div>

          {/* Vote preview */}
          <div className="mt-7 rounded-2xl bg-purple-50 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
              Your vote
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Lifestyle</p>
                <p className="font-bold text-gray-900">{lifestyle}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Contestant</p>
                <p className="font-bold text-gray-900">
                  {contestantName || "Not entered yet"}
                </p>
              </div>
            </div>
          </div>
          {error && (
  <div
    role="alert"
    className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
  >
    {error}
  </div>
)}

          {/* Submit */}
        <button
  type="submit"
  disabled={!contestantName.trim() || loading}
  className="mt-7 w-full rounded-2xl bg-purple-600 px-5 py-4 text-base font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300"
>
  {loading ? "Submitting..." : "Submit Vote"}
</button>

          <p className="mx-auto mt-4 max-w-md text-center text-xs leading-5 text-gray-400">
            Your vote will be recorded under the selected lifestyle.
          </p>
        </form>
      </div>
    </main>
  );
}