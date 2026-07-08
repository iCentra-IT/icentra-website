"use client";

import { useState } from "react";
import { FormCard, FormField, FormSelect, FormTextarea, IcentraCheckbox, FormSubmit, FormRow, WebinarBanner, FormFileUpload } from "../form-component";


/* ─────────────────────────────────────────────────
   SHARED OPTIONS
───────────────────────────────────────────────── */
const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"];
const CONSULTATION_TYPE_OPTIONS = ["Strategy Consulting", "Technology Advisory", "Training & Development", "Cybersecurity Audit", "Other"];
const CONTACT_METHOD_OPTIONS = ["Email", "Phone", "Video Call", "In-Person"];
const URGENCY_OPTIONS = ["Low", "Medium", "High", "Critical"];
const SUBJECT_OPTIONS = ["General Inquiry", "Partnership", "Media & Press", "Complaint", "Other"];
const INDUSTRY_OPTIONS = ["Government", "Not-for-Profit", "Banking & Finance", "Telecoms & IT", "Construction", "Oil & Gas", "Health", "Agriculture", "Education", "Manufacturing", "Defence", "Media"];
const SOLUTION_OPTIONS = ["Enterprise Transformation", "Cybersecurity & GRC", "Strategy & Execution", "Learning & Talent"];
const CAREER_LEVEL_OPTIONS = ["Analyst", "Senior Analyst", "Manager", "Senior Manager", "Director", "Vice President", "Chief"];
const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];
const INTEREST_OPTIONS = ["Enterprise Transformation", "Cybersecurity", "Strategy & Execution", "Learning & Development", "Events & Webinars", "Research & Reports"];
const TIMEZONE_OPTIONS = ["UTC-5 (EST)", "UTC+0 (GMT)", "UTC+1 (WAT)", "UTC+3 (EAT)", "UTC+5:30 (IST)", "UTC+8 (SGT)"];
const REMINDER_OPTIONS = ["1 hour before", "1 day before", "3 days before", "1 week before"];
const HOW_HEARD_OPTIONS = ["Google / Search", "Social Media", "Referral", "Email Newsletter", "Event", "Other"];
const TIMELINE_OPTIONS = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "6+ months"];
const CORPORATE_SOLUTION_OPTIONS = ["Enterprise Transformation", "Cybersecurity & GRC", "PMO & Delivery", "Strategy & Execution", "Learning & Development", "Custom Programme"];
const AVAILABILITY_OPTIONS = ["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings", "Flexible"];

/* ═══════════════════════════════════════════════════
   1. GENERAL CONTACT FORM (variant 1 — with consultation fields)
═══════════════════════════════════════════════════ */
export function GeneralContactFormA() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormField label="Company Name" name="companyName" placeholder="Name" />
        <FormSelect label="Company Size" name="companySize" options={COMPANY_SIZE_OPTIONS} placeholder="Select Subject" />
        <FormSelect label="Consultation Type" name="consultationType" options={CONSULTATION_TYPE_OPTIONS} placeholder="Select Type" />
        <FormField label="Preferred Date & Time" name="preferredDateTime" type="datetime-local" placeholder="DD/MM/YYYY HH:MM" />
        <FormTextarea label="Project Description" name="projectDescription" rows={5} placeholder="Type here..." />
        <FormSelect label="Preferred Contact Method" name="contactMethod" options={CONTACT_METHOD_OPTIONS} placeholder="Select Type" />
        <FormSelect label="Urgency Level" name="urgencyLevel" options={URGENCY_OPTIONS} placeholder="select level" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   2. GENERAL CONTACT FORM (variant 2 — shorter, motivation)
═══════════════════════════════════════════════════ */
export function GeneralContactFormB() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="General Contact Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormField label="Company Name" name="companyName" placeholder="Name" />
        <FormSelect label="Subject" name="subject" options={SUBJECT_OPTIONS} placeholder="Select Subject" />
        <FormTextarea label="Motivation" name="motivation" rows={5} placeholder="Type here..." />
        <FormSelect label="Preferred Contact Method" name="contactMethod" options={CONTACT_METHOD_OPTIONS} placeholder="Select Method" />
        <FormSelect label="Urgency Level" name="urgencyLevel" options={URGENCY_OPTIONS} placeholder="Select Level" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   3. HOMEPAGE FORM — "Start Your Transformation Journey"
═══════════════════════════════════════════════════ */
export function HomepageForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Start Your Transformation Journey">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name" required name="firstName" placeholder="Enter first name" />
          <FormField label="Last Name" required name="lastName" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter Email" />
          <FormField label="Phone Number" required name="phone" type="tel" placeholder="Enter phone number" />
        </FormRow>
        <FormField label="Company" required name="company" placeholder="Enter Company" />
        <FormSelect label="Industry" required name="industry" options={INDUSTRY_OPTIONS} placeholder="Select Industry" />
        <FormSelect label="Preferred Solution" name="solution" options={SOLUTION_OPTIONS} placeholder="Select Industry" />
        <FormTextarea label="Message" name="message" rows={6} placeholder="Type your message here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   4. INSIGHTS & RESOURCES — Webinar Registration Form
═══════════════════════════════════════════════════ */
export function WebinarRegistrationForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Webinar Registration Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {/* Webinar event banner */}
        <WebinarBanner
          image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
          alt="Leadership in Business Webinar"
        />
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormSelect label="Time Zone" name="timezone" options={TIMEZONE_OPTIONS} placeholder="Select time zone" />
        <FormTextarea label="Questions For Host" name="hostQuestions" rows={4} placeholder="Type your questions here..." />
        <FormSelect label="Reminder References" name="reminder" options={REMINDER_OPTIONS} placeholder="Select time zone" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   5. JOB APPLICATION FORM
═══════════════════════════════════════════════════ */
export function JobApplicationForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Job Application Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormFileUpload label="Upload your Resume and Cover Letter" required accept=".pdf,.doc,.docx" />
        <FormField label="LinkedIn Profile Upload" name="linkedin" type="url" placeholder="Url" />
        <FormField label="Referral Source" required name="referral" placeholder="Referral" />
        <FormField label="Availability Date" name="availabilityDate" type="date" placeholder="dd/mm/yyyy" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   6. NEWSLETTER SUBSCRIPTION FORM
═══════════════════════════════════════════════════ */
export function NewsletterSubscriptionForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Newsletter Subscription Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormSelect label="Interest Categories" name="interests" options={INTEREST_OPTIONS} placeholder="Select Industry" />
        <FormSelect label="Frequency Preference" name="frequency" options={FREQUENCY_OPTIONS} placeholder="Select Industry" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   7. RESOURCE DOWNLOAD FORM
═══════════════════════════════════════════════════ */
export function ResourceDownloadForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Resource Download Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormField label="Company Name" name="companyName" placeholder="Select time zone" />
        <FormField label="Job Title" name="jobTitle" placeholder="Enter your active mail" />
        <FormSelect label="Industry" required name="industry" options={INDUSTRY_OPTIONS} placeholder="Select time zone" />
        <FormSelect label="How did you hear about us" name="howHeard" options={HOW_HEARD_OPTIONS} placeholder="Select time zone" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   8. INDIVIDUAL LEARNING FORM
═══════════════════════════════════════════════════ */
export function IndividualLearningForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Individual Learning Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name" required name="firstName" placeholder="Enter first name" />
          <FormField label="Last Name" required name="lastName" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter Email" />
          <FormField label="Phone Number" required name="phone" type="tel" placeholder="select organization" />
        </FormRow>
        <FormSelect label="Career Level" required name="careerLevel" options={CAREER_LEVEL_OPTIONS} placeholder="Select Career level" />
        <FormSelect label="Preferred Date/Time" required name="preferredDateTime" options={["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–8pm)", "Weekend"]} placeholder="Select Industry" />
        <FormSelect label="Area of Interest" name="areaOfInterest" options={SOLUTION_OPTIONS} placeholder="Select Industry" />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   9. CORPORATE SOLUTION INQUIRY FORM
═══════════════════════════════════════════════════ */
export function CorporateSolutionForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Corporate Solution Inquiry Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormRow>
          <FormField label="First Name" required name="firstName" placeholder="Enter first name" />
          <FormField label="Last Name" required name="lastName" placeholder="Enter last name" />
        </FormRow>
        <FormRow>
          <FormField label="Email" required name="email" type="email" placeholder="Enter Email" />
          <FormField label="Phone Number" required name="phone" type="tel" placeholder="select organization" />
        </FormRow>
        <FormField label="Company" required name="company" placeholder="Enter Company" />
        <FormSelect label="Industry" required name="industry" options={INDUSTRY_OPTIONS} placeholder="Select Industry" />
        <FormSelect label="Corporate Solution" name="corporateSolution" options={CORPORATE_SOLUTION_OPTIONS} placeholder="Select Industry" />
        <FormTextarea label="Message" name="message" rows={6} placeholder="Tell us about your needs..." />
        <FormRow>
          <FormField label="Preferred Contact Method" name="contactMethod" placeholder="Enter Email" />
          <FormSelect label="Timeline" name="timeline" options={TIMELINE_OPTIONS} placeholder="select organization" />
        </FormRow>
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}

/* ═══════════════════════════════════════════════════
   10. VOLUNTEER REGISTRATION FORM
═══════════════════════════════════════════════════ */
export function VolunteerRegistrationForm() {
  const [agreed, setAgreed] = useState(false);
  return (
    <FormCard title="Volunteer Registration Form">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Full Name" required name="fullName" placeholder="Your surname first" />
        <FormField label="Email" required name="email" type="email" placeholder="Enter your active mail" />
        <FormField label="Skills/ Expertise" name="skills" placeholder="Skill set" />
        <FormSelect label="Availability" required name="availability" options={AVAILABILITY_OPTIONS} placeholder="Referral" />
        <FormTextarea label="Motivation" name="motivation" rows={5} placeholder="Type here..." />
        <IcentraCheckbox checked={agreed} onChange={setAgreed} />
        <FormSubmit />
      </form>
    </FormCard>
  );
}