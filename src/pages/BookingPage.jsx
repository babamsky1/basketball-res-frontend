import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    Info,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

const HOURLY_RATE = 500;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const displayDate = (dateStr, month = "long") =>
  dateStr
    ? parseDate(dateStr).toLocaleDateString("en-PH", {
        month,
        day: "numeric",
        year: "numeric",
      })
    : "";

const displayTime = (time) => {
  if (!time) return "--:--";
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

export default function BookingPage() {
  const today = new Date();
  const todayString = formatDate(today);
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [currentMonth, setCurrentMonth] = useState(currentMonthStart);
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: 42 }, (_, i) => {
      const day = i - firstDay + 1;
      return day > 0 && day <= totalDays ? new Date(year, month, day) : null;
    });
  }, [currentMonth]);

  const durationMinutes = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const diff = eh * 60 + em - (sh * 60 + sm);
    return diff > 0 ? diff : 0;
  }, [startTime, endTime]);

  const totalAmount = (durationMinutes / 60) * HOURLY_RATE;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = durationMinutes
    ? `${hours} hr${hours !== 1 ? "s" : ""}${minutes ? ` ${minutes} mins` : ""}`
    : "Not selected";

  const isValidTimeRange = durationMinutes > 0;
  const isCurrentMonth =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const changeMonth = (dir) =>
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1),
    );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!isValidTimeRange) return alert("Please select a valid time range.");
    alert(
      "Booking UI is ready. Backend integration will be added in the next step.",
    );
  };

  return (
    <MainLayout>
      {/* Solid dark background without hero image */}
      <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white"
              >
                <ArrowLeft size={13} /> Back to Home
              </Link>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                <h1 className="text-xl font-extrabold sm:text-2xl">
                  Book Your Court
                </h1>
                <p className="text-xs text-slate-400">
                  Select your preferred date and playing hours.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2 sm:flex">
              <Clock size={16} className="text-orange-400" />
              <div>
                <p className="text-[10px] text-slate-400">Court Rental Rate</p>
                <p className="text-sm font-bold">
                  ₱500.00{" "}
                  <span className="text-xs font-normal text-slate-400">
                    / hour
                  </span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
            {/* Calendar & Time */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
              {/* Calendar */}
              <section className="rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl lg:col-span-7">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={16} className="text-orange-400" />
                      <h2 className="text-sm font-bold">Select a Date</h2>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Choose your preferred booking date.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentMonth(currentMonthStart);
                      setSelectedDate(todayString);
                    }}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    Today
                  </button>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    {currentMonth.toLocaleDateString("en-PH", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                      disabled={isCurrentMonth}
                      aria-label="Previous month"
                      className="rounded-md border border-white/10 p-1 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                      aria-label="Next month"
                      className="rounded-md border border-white/10 p-1 text-slate-300 hover:bg-white/10"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((day) => (
                    <div
                      key={day}
                      className="py-1 text-center text-[10px] font-bold uppercase text-slate-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, idx) => {
                    if (!date)
                      return <div key={`empty-${idx}`} className="h-9" />;
                    const dateStr = formatDate(date);
                    const isSelected = dateStr === selectedDate;
                    const isPast = dateStr < todayString;
                    const isToday = dateStr === todayString;

                    return (
                      <button
                        key={dateStr}
                        type="button"
                        disabled={isPast}
                        onClick={() => !isPast && setSelectedDate(dateStr)}
                        className={`relative flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition ${
                          isSelected
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                            : isPast
                              ? "cursor-not-allowed text-slate-700"
                              : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {date.getDate()}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 size-1 rounded-full bg-orange-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-2.5 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-sm bg-orange-500" />{" "}
                    Selected
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-sm bg-slate-500" /> Today
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-sm bg-slate-800" /> Past
                  </span>
                  <span className="ml-auto truncate font-medium text-orange-300">
                    {displayDate(selectedDate)}
                  </span>
                </div>
              </section>

              {/* Time & Summary */}
              <section className="rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl lg:col-span-5">
                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-orange-400" />
                    <h2 className="text-sm font-bold">Select Time Range</h2>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Choose your reservation start and end time.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    {
                      id: "startTime",
                      label: "From",
                      value: startTime,
                      setter: setStartTime,
                    },
                    {
                      id: "endTime",
                      label: "To",
                      value: endTime,
                      setter: setEndTime,
                      min: startTime || undefined,
                    },
                  ].map(({ id, label, value, setter, min }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="mb-1 block text-[11px] font-semibold text-slate-300"
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        type="time"
                        required
                        min={min}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-slate-800 px-2.5 py-2 text-xs font-semibold text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-lg border border-white/10 bg-slate-800/70 p-3.5">
                  <h3 className="mb-2.5 text-xs font-bold">
                    Reservation Summary
                  </h3>

                  <div className="space-y-2 text-xs">
                    {[
                      ["Date", displayDate(selectedDate, "short")],
                      [
                        "Time",
                        `${displayTime(startTime)} - ${displayTime(endTime)}`,
                      ],
                      ["Duration", formattedDuration],
                      ["Hourly Rate", "₱500.00"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between gap-2">
                        <span className="text-slate-400">{label}</span>
                        <span className="text-right font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="my-3 border-t border-white/10" />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">Total Amount</span>
                    <span className="text-lg font-extrabold text-orange-400">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                {!isValidTimeRange && (
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-red-400/20 bg-red-500/10 p-2 text-[11px] text-red-300">
                    <Info size={14} className="shrink-0" />
                    End time must be later than start time.
                  </div>
                )}
              </section>
            </div>

            {/* Customer Info */}
            <section className="rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl">
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold">Customer Information</h2>
                <p className="hidden text-[11px] text-slate-400 sm:block">
                  Enter your details to continue.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    key: "name",
                    label: "Full Name",
                    type: "text",
                    max: 150,
                    placeholder: "Enter your full name",
                  },
                  {
                    key: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "Enter your email",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    type: "tel",
                    max: 15,
                    placeholder: "Enter your phone number",
                  },
                ].map(({ key, label, type, max, placeholder }) => (
                  <div key={key}>
                    <label
                      htmlFor={`customer-${key}`}
                      className="mb-1 block text-[11px] font-semibold text-slate-300"
                    >
                      {label}
                    </label>
                    <input
                      id={`customer-${key}`}
                      type={type}
                      required
                      maxLength={max}
                      placeholder={placeholder}
                      value={customer[key]}
                      onChange={(e) =>
                        setCustomer((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-orange-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Action Bar */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center justify-between gap-3 sm:block">
                <p className="text-[11px] text-slate-400">
                  Estimated reservation total
                </p>
                <p className="text-lg font-extrabold text-white">
                  {formatCurrency(totalAmount)}
                </p>
              </div>

              <button
                type="submit"
                disabled={!isValidTimeRange}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Continue to Reservation <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
