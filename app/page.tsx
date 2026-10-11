"use client";

import { useEffect, useState } from "react";
import LifestyleCard from "@/components/LifestyleCard";
import VotingForm from "@/components/VotingForm";

const lifestyles = [
  {
    id: "female-blogger",
    icon: "👩‍💻",
    name: "Best Female Blogger",
    description: "Celebrating creativity and outstanding female content creators.",
  },
  {
    id: "male-blogger",
    icon: "🧑‍💻",
    name: "Best Male Blogger",
    description: "Recognizing creativity and excellence in male blogging.",
  },
  {
    id: "best-driver",
    icon: "🚗",
    name: "Best Driver",
    description: "Honoring excellent driving skills and professionalism.",
  },
  {
    id: "female-driver",
    icon: "👩‍✈️",
    name: "Best Female Driver",
    description: "Celebrating skilled and outstanding female drivers.",
  },
  {
    id: "best-crew",
    icon: "🤝",
    name: "Best Crew",
    description: "Recognizing teamwork and exceptional crew performance.",
  },
  {
    id: "photographer",
    icon: "📸",
    name: "Best Photographer",
    description: "Celebrating creativity and outstanding photography.",
  },
  {
    id: "adventure",
    icon: "✈️",
    name: "Best Adventure",
    description: "Recognizing exciting and unforgettable adventures.",
  },
  {
    id: "maintained-nganya",
    icon: "✨",
    name: "Well Maintained Nganya",
    description: "Celebrating cleanliness, upkeep, and excellent condition.",
  },
  {
    id: "best-nganya",
    icon: "🚌",
    name: "Best Nganya",
    description: "Recognizing outstanding style and matatu creativity.",
  },
  {
    id: "best-route",
    icon: "🛣️",
    name: "Best Route",
    description: "Celebrating an outstanding public transport route.",
  },
  {
    id: "best-sacco",
    icon: "🏆",
    name: "Best Sacco",
    description: "Recognizing excellence among transport Saccos.",
  },
  {
    id: "home-of-mbokos",
    icon: "💃",
    name: "Home of Mbokos",
    description: "Celebrating the recognized Home of Mbokos.",
  },
  {
    id: "update-channel",
    icon: "📢",
    name: "Best Update Channel",
    description: "Recognizing reliable and engaging update channels.",
  },
  {
    id: "page-updates",
    icon: "📱",
    name: "Best Page Updates",
    description: "Celebrating engaging and timely page updates.",
  },
  {
    id: "disciplined-driver",
    icon: "🛡️",
    name: "Well Discipline Driver",
    description: "Honoring responsible and disciplined drivers.",
  },
  {
    id: "disciplined-crew",
    icon: "🙌",
    name: "Well Discipline Crew",
    description: "Recognizing respectful and disciplined crew members.",
  },
  {
    id: "disciplined-route",
    icon: "🚦",
    name: "Well Discipline route",
    description: "Celebrating orderly and disciplined transport routes.",
  },
  {
    id: "disciplined-conductor",
    icon: "🎫",
    name: "Well Discipline Conductor",
    description: "Honoring respectful and disciplined conductors.",
  },
  {
    id: "uniform-001",
    icon: "👔",
    name: "Uniform 001",
    description: "Recognizing outstanding uniform style and presentation.",
  },
  {
    id: "crazy-art-nganya",
    icon: "🎨",
    name: "Best Nganya with Crazy Art",
    description: "Celebrating bold artwork and creative nganya designs.",
  },
];

export default function Home() {

  const [selectedLifestyle, setSelectedLifestyle] =
    useState<string | null>(null);

  const [votedCategories, setVotedCategories] =
    useState<string[]>([]);

  const [statusLoading, setStatusLoading] =
    useState(true);
    const [statusError, setStatusError] = useState("");

  useEffect(() => {
    async function loadVotingStatus() {
      try {
        const response = await fetch("/api/voting-status", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load voting status");
        }

        const data = await response.json();

        setVotedCategories(data.votedCategories ?? []);
      }  catch (error) {
  console.error("Voting status error:", error);
  setStatusError(
    "We couldn't check your previous votes. Please refresh the page."
  );
}finally {
        setStatusLoading(false);
      }
    }

    loadVotingStatus();
  }, []);

  if (selectedLifestyle) {
    const lifestyle = lifestyles.find(
      (item) => item.id === selectedLifestyle
    );

    return (
      <VotingForm
        categoryId={lifestyle?.id ?? ""}
        lifestyle={lifestyle?.name ?? ""}
        onBack={() => setSelectedLifestyle(null)}
        onVoteSuccess={(categoryId) => {
          setVotedCategories((previous) =>
            previous.includes(categoryId)
              ? previous
              : [...previous, categoryId]
          );
        }}
      />
    );
  }


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
   <section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: "url('/images/hero.jpeg')",
  }}
>
  {/* Dark purple overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/90 via-purple-900/75 to-indigo-950/80" />

  {/* Hero content */}
  <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">

    {/* Navigation */}
    <header className="flex items-center justify-between">
      <div className="text-lg font-bold tracking-tight sm:text-xl">
        ✦ LIFESTYLE AWARDS
      </div>

      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        <a href="#lifestyles" className="text-white/80 transition hover:text-white">
          Vote
        </a>

        <a href="#about" className="text-white/80 transition hover:text-white">
          About
        </a>

      <a href="/results" className="text-white/80 transition hover:text-white">
  Results
</a>
      </nav>

      <button
        type="button"
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg md:hidden"
      >
        ☰
      </button>
    </header>

    {/* Hero content */}
<div className="mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-end pb-8 pt-10 text-center sm:min-h-[480px] sm:pb-8 sm:pt-24 lg:min-h-[520px] lg:pb-6 lg:pt-32">
  <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-200">
    2026 Lifestyle Awards
  </p>

  <a
    href="#lifestyles"
    className="mt-9 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-purple-800 shadow-xl transition hover:bg-purple-50 active:scale-95"
  >
    Start Voting →
  </a>
</div>
  </div>
</section>
      {/* Lifestyle section */}
    <section
  id="lifestyles"
  className="scroll-mt-6 bg-gradient-to-b from-purple-50 via-white to-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Section heading */}
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-purple-600" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
          2026 Life Awards
        </span>
      </div>

      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        Choose Your{" "}
        <span className="text-purple-700">Category</span>
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
        Every category celebrates excellence, creativity, and the people
        making a difference. Choose your favorite category and cast your vote.
      </p>

      {/* Category count */}
      <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-100/70 px-4 py-2 text-sm font-semibold text-purple-800">
        <span className="text-lg">✦</span>
        {lifestyles.length} award categories to explore
      </div>
    </div>

    {statusError && (
  <div
    role="alert"
    className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-700"
  >
    {statusError}
  </div>
)}

    {/* Category cards */}


<div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
  {lifestyles.map((lifestyle, index) => {
    const hasVoted = votedCategories.includes(lifestyle.id);

    return (
      <div
        key={lifestyle.id}
        className="group relative"
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-purple-400 to-indigo-400 opacity-0 blur transition duration-300 group-hover:opacity-25" />

        <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-purple-200 group-hover:shadow-xl">
          <LifestyleCard
            icon={lifestyle.icon}
            name={lifestyle.name}
            description={lifestyle.description}
            selected={hasVoted}
           disabled={statusLoading || Boolean(statusError) || hasVoted}
            onClick={() => {
              if (statusLoading || hasVoted) return;
              setSelectedLifestyle(lifestyle.id);
            }}
          />

          {hasVoted && (
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
              ✓ Voted
            </span>
          )}
        </div>
      </div>
    );
  })}
</div>


    {/* Bottom note */}
    <div className="mt-12 text-center sm:mt-16">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-purple-700">Your vote matters.</span>{" "}
        Celebrate the best and help your favorites get recognized.
      </p>
    </div>

  </div>
</section>

      {/* Simple information section */}
      <section
        id="about"
        className="border-t border-gray-100 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            How voting works
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="text-3xl">1️⃣</div>
              <h3 className="mt-4 font-bold text-gray-900">
                Choose a lifestyle
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Select the lifestyle category you want to vote in.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="text-3xl">2️⃣</div>
              <h3 className="mt-4 font-bold text-gray-900">
                Enter a name
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Type the name of the person you believe deserves the award.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="text-3xl">3️⃣</div>
              <h3 className="mt-4 font-bold text-gray-900">
                Cast your vote
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Submit your vote and optionally tell us why you chose them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="results"
        className="border-t border-gray-100 bg-gray-950 px-4 py-8 text-center text-sm text-gray-400"
      >
        <p>© 2026 Life Awards. All rights reserved.</p>
      </footer>
    </main>
  );
}