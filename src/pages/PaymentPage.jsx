// src/pages/PaymentPage.jsx

import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Home,
    MapPin,
    Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

export default function PaymentPage() {
  // UI preview data. We'll connect this to Django later.
  const reservation = {
    reference: "CR-XXXXXXXX",
    date: "November 28, 2026",
    time: "8:00 AM – 10:00 AM",
    duration: "2 hours",
    rate: 500,
    total: 1000,
    customer: "Customer Name",
    email: "customer@email.com",
  };

  return (
    <MainLayout fitScreen>
      <div className="flex h-full w-full items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          {/* Payment success header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10">
              <CheckCircle2 size={42} className="text-green-400" />
            </div>

            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-green-400">
              Payment Successful
            </p>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              You're All Set!
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
              Your basketball court reservation has been paid. We look forward
              to seeing you on the court!
            </p>
          </div>

          {/* Reservation details card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]/95 shadow-2xl">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <Receipt size={18} className="text-orange-500" />
                <h2 className="text-sm font-bold text-white">
                  Reservation Details
                </h2>
              </div>

              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400">
                Paid
              </span>
            </div>

            <div className="space-y-5 p-6">
              {/* Reference number */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Reservation Reference
                </p>
                <p className="mt-1 font-mono text-sm font-bold tracking-wider text-orange-400">
                  {reservation.reference}
                </p>
              </div>

              {/* Booking information */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <CalendarDays size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Reservation Date</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {reservation.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <Clock3 size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Reserved Time</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {reservation.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <MapPin size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Court</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Basketball Court
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <Clock3 size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Duration</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {reservation.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-white/15" />

              {/* Customer information */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Customer Information
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-white/50">Name</span>
                    <span className="text-right font-medium text-white">
                      {reservation.customer}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-white/50">Email</span>
                    <span className="break-all text-right font-medium text-white">
                      {reservation.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment breakdown */}
              <div className="rounded-xl bg-white/[0.04] p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">
                    {reservation.duration} × ₱
                    {reservation.rate.toLocaleString()}/hour
                  </span>
                  <span className="text-white">
                    ₱{reservation.total.toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="font-bold text-white">Total Paid</span>
                  <span className="text-2xl font-black text-orange-400">
                    ₱{reservation.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-6 space-y-3 text-center">
            <Link
              to="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <Home size={18} />
              Back to Homepage
              <ArrowRight size={18} />
            </Link>

            <p className="text-xs text-white/40">
              Please keep your reservation reference for future inquiries.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
