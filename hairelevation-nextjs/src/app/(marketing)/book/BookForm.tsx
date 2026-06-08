/**
 * BookForm Component
 * Client component for the booking form
 */

"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { WHATSAPP } from "@/constants/brand";

export function BookForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    const serviceLabels: Record<string, string> = {
      "custom-wig": "Custom Wig Making",
      revamp: "Wig Revamp & Maintenance",
      installation: "Wig Installation & Sew-in",
    };

    const message = `
*New Booking Request - Hair Elevation Studio*

*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Service:* ${serviceLabels[formData.service] || formData.service}
*Date:* ${formData.date}
*Time:* ${formData.time}
${formData.notes ? `*Notes:* ${formData.notes}` : ""}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`${WHATSAPP.url}?text=${encodedMessage}`, "_blank");

    setFormMessage(
      "Your booking request has been prepared! Please send the pre-filled message on WhatsApp to confirm your appointment."
    );
    setFormData({
      fullName: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <form
        id="booking-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-[10px] shadow-[0_8px_20px_rgba(99,42,35,0.1)] p-6 space-y-5"
      >
        {/* Full Name */}
        <div className="form-group">
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Service Type */}
        <div className="form-group">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Service Type
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
          >
            <option value="">Select Service</option>
            <option value="custom-wig">Custom Wig Making</option>
            <option value="revamp">Wig Revamp & Maintenance</option>
            <option value="installation">Wig Installation & Sew-in</option>
          </select>
        </div>

        {/* Preferred Date */}
        <div className="form-group">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
          />
        </div>

        {/* Preferred Time */}
        <div className="form-group">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all"
          />
        </div>

        {/* Additional Notes */}
        <div className="form-group">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-[#3B2A23] mb-2"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-[5px] border border-[#E8D5C4] bg-[#FAF8F5] text-[#3B2A23] focus:outline-none focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 transition-all resize-none"
            placeholder="Any additional details about your appointment..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </Button>
      </form>

      {/* Form Message */}
      {formMessage && (
        <div
          id="form-message"
          className="mt-6 p-4 bg-[#28A745]/10 border border-[#28A745] rounded-[10px] text-[#28A745] text-center"
        >
          {formMessage}
        </div>
      )}
    </>
  );
}
