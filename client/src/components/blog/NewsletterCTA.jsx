import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitLead } from "../../utils/submitLead";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const safeEmail = String(email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
      return toast.error("Please enter a valid email address.");
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        name: "Newsletter Subscriber",
        email: safeEmail,
        phoneNumber: "N/A",
        location: "N/A",
        subject: "New Blog Newsletter Subscription",
        message: `Subscriber Email: ${safeEmail}\nRequested blog updates subscription.`,
      });
      toast.success("Thank you for subscribing to StudyGrinder updates!");
      setEmail("");
    } catch (err) {
      toast.error(err?.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 text-left space-y-4">
      <div className="p-2.5 w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
        <Mail className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white tracking-tight leading-tight">Subscribe to Updates</h4>
        <p className="text-slate-400 text-xs leading-relaxed">
          Get the latest security auditing tips, React benchmarks, and web development guidelines.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 flex-grow text-white"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
