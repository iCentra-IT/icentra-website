"use client";

import { useState } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/* ═══════════════════════════════════════════════════
   SHARED STYLE CONSTANTS
═══════════════════════════════════════════════════ */
const INPUT_BASE =
  "w-full px-4 py-3.5 rounded-xl border border-[#DCE0E8] bg-white text-[14px] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20 transition-colors";

const LABEL_BASE = "text-[#374151] text-[13px] font-medium";

/* ═══════════════════════════════════════════════════
   FORM CARD WRAPPER
   Wraps every form with the light-blue bg + rounded card
═══════════════════════════════════════════════════ */
export function FormCard({
  title,
  children,
  maxWidth = "max-w-[680px]",
}: {
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className={`w-full ${maxWidth} mx-auto bg-[#EAF3FB] rounded-3xl px-6 py-8 sm:px-10 sm:py-10`}>
      <h2 className="text-[#1A274F] text-[26px] sm:text-[30px] font-extrabold mb-8 leading-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FORM FIELD — text / email / url / date / datetime-local
═══════════════════════════════════════════════════ */
export function FormField({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={LABEL_BASE}>
        {label}
        {required && <span className="text-[#0066FF] ml-0.5">*</span>}
      </label>
      <input required={required} {...props} className={INPUT_BASE} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FORM SELECT — dropdown
═══════════════════════════════════════════════════ */
export function FormSelect({
  label,
  required,
  options,
  placeholder,
  ...props
}: {
  label: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={LABEL_BASE}>
        {label}
        {required && <span className="text-[#0066FF] ml-0.5">*</span>}
      </label>
      <select
        required={required}
        defaultValue=""
        {...props}
        className={`${INPUT_BASE} appearance-none cursor-pointer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "40px",
        }}
      >
        <option value="" disabled>{placeholder || `Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FORM TEXTAREA
═══════════════════════════════════════════════════ */
export function FormTextarea({
  label,
  required,
  rows = 5,
  ...props
}: {
  label: string;
  required?: boolean;
  rows?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={LABEL_BASE}>
        {label}
        {required && <span className="text-[#0066FF] ml-0.5">*</span>}
      </label>
      <textarea
        required={required}
        rows={rows}
        {...props}
        className={`${INPUT_BASE} resize-none`}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FORM 2-COL ROW — side-by-side fields on sm+
═══════════════════════════════════════════════════ */
export function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
  );
}

/* ═══════════════════════════════════════════════════
   iCENTRA CHECKBOX
═══════════════════════════════════════════════════ */
export function IcentraCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            checked
              ? "bg-[#0066FF] border-[#0066FF]"
              : "bg-white border-[#DCE0E8] group-hover:border-[#0066FF]"
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-[#374151] text-[13px] leading-relaxed">
        I would like to receive details about products, services and events from iCentra.
      </span>
    </label>
  );
}

/* ═══════════════════════════════════════════════════
   FILE UPLOAD FIELD
═══════════════════════════════════════════════════ */
export function FormFileUpload({
  label,
  required,
  accept = ".pdf,.doc,.docx",
}: {
  label: string;
  required?: boolean;
  accept?: string;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemove = () => setFileName(null);

  return (
    <div className="flex flex-col gap-1.5">
      <label className={LABEL_BASE}>
        {label}
        {required && <span className="text-[#0066FF] ml-0.5">*</span>}
      </label>

      {/* Drop zone */}
      <label className="flex flex-col items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed border-[#DCE0E8] bg-white/80 cursor-pointer hover:border-[#0066FF] hover:bg-white transition-colors">
        <svg className="w-7 h-7 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-3h6m6-10.5V19a2.5 2.5 0 01-5 0V6.5m0 0A2.5 2.5 0 0114 4h-4a2.5 2.5 0 00-2.5 2.5" />
        </svg>
        <p className="text-[#9CA3AF] text-[13px]">
          Click <span className="text-[#0066FF] font-semibold">here</span> to upload your supporting document
        </p>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          required={required && !fileName}
        />
      </label>

      {/* File preview */}
      {fileName && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#DCE0E8] bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <svg className="w-5 h-5 text-[#0066FF] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM8 13h8v1H8zm0 3h8v1H8zm0-6h5v1H8z" />
            </svg>
            <span className="text-[#374151] text-[13px] truncate">{fileName}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors shrink-0 ml-3"
            aria-label="Remove file"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FORM SUBMIT BUTTON
═══════════════════════════════════════════════════ */
export function FormSubmit({ label = "Submit" }: { label?: string }) {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="submit"
        className="w-full sm:w-[260px] py-4 rounded-full bg-[#0066FF] text-white text-[14px] font-semibold hover:bg-[#25429A] transition-colors"
      >
        {label}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   WEBINAR BANNER — image slot for webinar form
═══════════════════════════════════════════════════ */
export function WebinarBanner({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-6 border border-[#DCE0E8]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}