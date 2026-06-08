/**
 * Book Appointment Page
 * Replicates book.html booking form
 */

import { Metadata } from "next";
import { BookForm } from "./BookForm";

export const metadata: Metadata = {
  title: "Book Appointment - Hair Elevation Studio",
  description:
    "Book an appointment for wig services at Hair Elevation Studio. Custom wig making, installation, and maintenance available.",
};

export default function BookPage() {
  return (
    <main>
      <section className="booking py-16 px-5">
        <div className="container max-w-[600px] mx-auto">
          <h1 className="text-[2rem] font-bold text-[#3B2A23] text-center mb-10">
            Book an Appointment
          </h1>
          <BookForm />
        </div>
      </section>
    </main>
  );
}
