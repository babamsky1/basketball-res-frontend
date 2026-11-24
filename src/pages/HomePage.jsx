import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100dvh-110px)] items-center">
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:px-10">
          {/* Welcome message and booking benefits */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
              <Trophy size={16} />
              Your Game Starts Here
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Ready for the
              <span className="block text-orange-400">Next Game?</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              Book your basketball court in just a few clicks. Choose your
              schedule, reserve your slot, and get ready to play.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-300">
              {["Easy Booking", "Online Payment", "Flexible Duration"].map(
                (benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-orange-400" />
                    {benefit}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Booking overview card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-950/75 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                  Court Reservation
                </span>
                <h2 className="mt-2 text-3xl font-extrabold">Own the Court.</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Your court. Your schedule. Your game.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5">
                <p className="text-sm font-medium text-orange-200">
                  Court Rental
                </p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    ₱500
                  </span>
                  <span className="mb-1 text-sm text-slate-400">/ hour</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Choose Your Date</p>
                    <p className="text-sm text-slate-400">
                      Select your preferred booking date.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Select Your Time</p>
                    <p className="text-sm text-slate-400">
                      Choose your schedule and duration.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Confirm Your Booking
                    </p>
                    <p className="text-sm text-slate-400">
                      Complete your reservation and payment.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/booking"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-600"
              >
                Start Your Reservation
                <ArrowRight size={19} />
              </Link>

              <p className="mt-3 text-center text-xs text-slate-500">
                Simple, convenient, and hassle-free booking.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
