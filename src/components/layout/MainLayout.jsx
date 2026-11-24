import courtBackground from "../../assets/court.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function MainLayout({ children, fitScreen = false }) {
  return (
    <div
      className={`flex flex-col bg-slate-950 text-white ${
        fitScreen ? "h-dvh overflow-hidden" : "min-h-dvh"
      }`}
      style={{
        // Keep the same court background across all pages.
        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 23, 0.90),
            rgba(2, 6, 23, 0.94)
          ),
          url(${courtBackground})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* Pages render inside this shared content area. */}
      <main
        id="main-content"
        className={`w-full flex-1 ${
          fitScreen ? "min-h-0 overflow-y-auto lg:overflow-hidden" : ""
        }`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
