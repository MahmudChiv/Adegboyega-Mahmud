"use client";
import { useState } from "react";
import CTAIcon from "./CTAIcon";
import ScrollIcon from "./ScrollIcon";
const email = "mahmud.adegboyega@gmail.com";
const links = [["GitHub", "https://github.com/MahmudChiv"], ["WhatsApp", "https://wa.me/2348164247735"], ["Writing", "https://medium.com/@mahmud.adegboyega"], ["CV / PDF", "/Mahmud_Adegboyega_CV.pdf"]];
export default function ContactSection() {
  const [copyStatus, setCopyStatus] = useState("");
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopyStatus("Email copied."); }
    catch { setCopyStatus("Please select the email address to copy it."); }
  };
  return <footer id="contact" className="contact-section"><div className="shell">
    <p className="eyebrow">NEXT CHAPTER</p>
    <div className="contact-heading"><h2>Have a real<br />problem to <span>solve?</span></h2><span className="contact-asterisk" aria-hidden="true">✳</span></div>
    <p className="contact-copy">A product idea, an engineering role, or a conversation worth having.<br />I’d love to hear about it.</p>
    <div className="contact-actions"><a className="email-link" href={`mailto:${email}`}>{email}<CTAIcon /></a><button type="button" className="copy-button" onClick={copyEmail}>Copy email</button></div><p role="status" className="copy-status">{copyStatus}</p>
    <div className="social-links">{links.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<CTAIcon /></a>)}</div>
    <div className="footer-bottom"><span>© 2026 Mahmud Adegboyega</span><span>DESIGNED WITH INTENT. BUILT IN LAGOS.</span><a href="#hero">Back to top <ScrollIcon direction="up" /></a></div>
  </div></footer>;
}
