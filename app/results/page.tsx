
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type VoteResult = {
  category_id: string;
  contestant_name: string;
  vote_count: number;
};

const categories = [
  { id: "female-blogger", name: "Best Female Blogger" },
  { id: "male-blogger", name: "Best Male Blogger" },
  { id: "best-driver", name: "Best Driver" },
  { id: "female-driver", name: "Best Female Driver" },
  { id: "best-crew", name: "Best Crew" },
  { id: "photographer", name: "Best Photographer" },
  { id: "adventure", name: "Best Adventure" },
  { id: "maintained-nganya", name: "Well Maintained Nganya" },
  { id: "best-nganya", name: "Best Nganya" },
  { id: "best-route", name: "Best Route" },
  { id: "best-sacco", name: "Best Sacco" },
  { id: "home-of-mbokos", name: "Home of Mbokos" },
  { id: "update-channel", name: "Best Update Channel" },
  { id: "page-updates", name: "Best Page Updates" },
  { id: "disciplined-driver", name: "Well Discipline Driver" },
  { id: "disciplined-crew", name: "Well Discipline Crew" },
  { id: "disciplined-route", name: "Well Discipline route" },
  { id: "disciplined-conductor", name: "Well Discipline Conductor" },
  { id: "uniform-001", name: "Uniform 001" },
  { id: "crazy-art-nganya", name: "Best Nganya with Crazy Art" },
];

export default function ResultsPage() {
  const [results, setResults] = useState<VoteResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    let active = true;

    async function loadResults() {
      try {
        const response = await fetch("/api/results", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load voting results");
        }

        const data = await response.json();

        if (!active) return;

        setResults(data.results ?? []);
        setLastUpdated(new Date().toLocaleTimeString());
        setError("");
      } catch {
        if (active) {
          setError("Unable to refresh results. Retrying...");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadResults();

    const interval = setInterval(loadResults, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter(
          (category) => category.id === selectedCategory
        );

  const totalVotes = results.reduce(
    (sum, result) => sum + Number(result.vote_count),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-purple-900 bg-purple-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link href="/" className="text-sm font-semibold text-purple-200 hover:text-white">
            ← Back to Voting
          </Link>

          <span className="text-sm font-bold tracking-wide sm:text-lg">
            ✦ LIFESTYLE AWARDS
          </span>
        </div>
      </header>

      <section className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 px-4 py-14 text-center text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-purple-400/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100">
            2026 Lifestyle Awards
          </span>

          <h1 className="mt-6 text-3xl font-extrabold sm:text-5xl">
            Live Voting Results
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-purple-200">
            Follow the competition and see who is leading each award category.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-2">
              {totalVotes.toLocaleString()} Total Votes
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2">
              {categories.length} Categories
            </span>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-200">
              ● Auto-refresh: 5 seconds
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Leaderboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {lastUpdated
                ? `Last updated: ${lastUpdated}`
                : "Loading results..."}
            </p>
          </div>

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-purple-500"
            aria-label="Filter by award category"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
            Loading voting results...
          </div>
        ) : (
          <div className="space-y-6">
            {visibleCategories.map((category) => {
              const contestants = results
                .filter(
                  (result) => result.category_id === category.id
                )
                .sort(
                  (a, b) =>
                    Number(b.vote_count) -
                    Number(a.vote_count)
                );

              const categoryVotes = contestants.reduce(
                (sum, contestant) =>
                  sum + Number(contestant.vote_count),
                0
              );

              return (
                <div
                  key={category.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-purple-50 px-5 py-4 sm:px-6">
                    <h3 className="text-lg font-bold text-purple-950">
                      {category.name}
                    </h3>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-700">
                      {categoryVotes} votes
                    </span>
                  </div>

                  {contestants.length === 0 ? (
                    <p className="px-6 py-8 text-center text-sm text-gray-400">
                      No votes recorded yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {contestants.map((contestant, index) => {
                        const percentage =
                          categoryVotes > 0
                            ? (Number(contestant.vote_count) /
                                categoryVotes) *
                              100
                            : 0;

                        return (
                          <div
                            key={`${category.id}-${contestant.contestant_name}`}
                            className="px-5 py-4 sm:px-6"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                                {index + 1}
                              </span>

                              <div className="min-w-0 flex-1">
                                <p className="break-words font-semibold text-gray-900">
                                  {contestant.contestant_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {percentage.toFixed(1)}% of category votes
                                </p>
                              </div>

                              <span className="shrink-0 font-bold text-purple-800">
                                {contestant.vote_count} votes
                              </span>
                            </div>

                            <div className="mt-3 ml-12 h-2 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-purple-600 transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
        © 2026 Lifestyle Awards. All rights reserved.
      </footer>
    </main>
  );
}
