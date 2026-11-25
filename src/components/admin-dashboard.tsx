"use client";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { ArrowDownToLine, LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Inquiry = {
  id: string;
  reference: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  category: string;
  product_names: string[];
  quantity: string;
  destination_country: string;
  message: string;
  attachment_path: string | null;
  status: "new" | "pending" | "completed";
  created_at: string;
};

let clientSingleton: SupabaseClient | null = null;

function getClient() {
  if (clientSingleton) return clientSingleton;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  clientSingleton = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return clientSingleton;
}

function isAdmin(user: User | null) {
  return user?.app_metadata?.role === "admin";
}

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingRows, setLoadingRows] = useState(true);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    const supabase = getClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const supabase = getClient();
    if (!supabase || !isAdmin(user)) return;
    void supabase
      .from("inquiries")
      .select("id, reference, full_name, company_name, email, phone, category, product_names, quantity, destination_country, message, attachment_path, status, created_at")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data, error: queryError }) => {
        if (queryError) setError("Could not load inquiries. Check the Supabase table and admin access policy.");
        else setRows((data ?? []) as Inquiry[]);
        setLoadingRows(false);
      });
  }, [user]);

  const visibleRows = useMemo(
    () => (filter === "all" ? rows : rows.filter((row) => row.status === filter)),
    [filter, rows],
  );

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getClient();
    if (!supabase) return;
    setError("");
    setBusy(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError || !data.user) {
      setError("Unable to sign in. Check your credentials and Supabase Auth configuration.");
      return;
    }
    if (!isAdmin(data.user)) {
      await supabase.auth.signOut();
      setError("This Supabase account does not have the admin role.");
      return;
    }
    setUser(data.user);
  }

  async function updateStatus(row: Inquiry, status: Inquiry["status"]) {
    const supabase = getClient();
    if (!supabase) return;
    setError("");
    const { error: updateError } = await supabase.from("inquiries").update({ status }).eq("id", row.id);
    if (updateError) {
      setError("Could not update this inquiry. Please check your admin permissions.");
      return;
    }
    setRows((current) => current.map((item) => item.id === row.id ? { ...item, status } : item));
  }

  async function downloadAttachment(path: string) {
    const supabase = getClient();
    if (!supabase) return;
    const { data, error: storageError } = await supabase.storage.from("inquiry-attachments").createSignedUrl(path, 60);
    if (storageError || !data) {
      setError("Could not create a temporary attachment link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  function exportCsv() {
    const columns: (keyof Inquiry)[] = ["reference", "created_at", "status", "full_name", "company_name", "email", "phone", "category", "product_names", "quantity", "destination_country", "message"];
    const escapeCell = (value: unknown) => {
      let text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
      if (/^[\s]*[=+\-@\t\r]/.test(text)) text = `'${text}`;
      return `"${text.replaceAll('"', '""')}"`;
    };
    const csv = [columns.join(","), ...visibleRows.map((row) => columns.map((column) => escapeCell(row[column])).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "krushi-inquiries.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!configured) return <AdminMessage title="Admin setup required" copy="Configure the Supabase URL and public anon key before using the admin area." />;

  if (!isAdmin(user)) {
    return (
      <div className="admin-login">
        <div className="admin-login-mark"><ShieldCheck size={25} /><span>KRUSHI GLOBAL / ADMIN</span></div>
        <h1>Administrator<br /><em>sign in.</em></h1>
        <p>Access is restricted to Supabase accounts with the admin application role.</p>
        <form onSubmit={signIn}>
          <label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="button" disabled={busy || !configured}>{busy ? "Signing in..." : "Sign in securely"}</button>
        </form>
      </div>
    );
  }

  const counts = {
    all: rows.length,
    new: rows.filter((row) => row.status === "new").length,
    pending: rows.filter((row) => row.status === "pending").length,
    completed: rows.filter((row) => row.status === "completed").length,
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-toolbar"><Link href="/" className="admin-brand">KRUSHI GLOBAL <span>/ ADMIN</span></Link><div><span>{user?.email}</span><button onClick={() => void getClient()?.auth.signOut()}><LogOut size={15} /> Sign out</button></div></header>
      <main className="admin-content">
        <div className="admin-heading"><div><span className="eyebrow">BUSINESS INQUIRIES / PRIVATE</span><h1>Inquiry <em>overview.</em></h1></div><div className="admin-actions"><button onClick={exportCsv} className="admin-action"><ArrowDownToLine size={15} /> Export CSV</button><button onClick={() => window.location.reload()} className="admin-action"><RefreshCw size={15} /> Refresh</button></div></div>
        <div className="admin-counts">{(["all", "new", "pending", "completed"] as const).map((status) => <button className={filter === status ? "active" : ""} onClick={() => setFilter(status)} key={status}><span>{status === "all" ? "All inquiries" : status}</span><strong>{counts[status]}</strong></button>)}</div>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {loadingRows ? <p className="admin-loading">Loading private inquiries…</p> : visibleRows.length === 0 ? <p className="admin-loading">No inquiries in this view.</p> : (
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Inquiry</th><th>Contact</th><th>Requirement</th><th>Received</th><th>Status</th></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.id}><td><strong>{row.reference}</strong><small>{row.category} · {row.product_names.join(", ") || "General inquiry"}</small><p>{row.message}</p>{row.attachment_path && <button className="admin-link" onClick={() => void downloadAttachment(row.attachment_path!)}>Download attachment</button>}</td><td><strong>{row.full_name}</strong><small>{row.company_name}</small><a href={`mailto:${row.email}`}>{row.email}</a><a href={`tel:${row.phone}`}>{row.phone}</a></td><td><strong>{row.quantity}</strong><small>Destination: {row.destination_country}</small></td><td>{new Date(row.created_at).toLocaleDateString()}</td><td><select value={row.status} onChange={(event) => void updateStatus(row, event.target.value as Inquiry["status"])} aria-label={`Update status for ${row.reference}`}><option value="new">New</option><option value="pending">Pending</option><option value="completed">Completed</option></select></td></tr>)}</tbody></table></div>
        )}
        <p className="admin-footnote">Showing up to 300 recent inquiries. Access is protected by Supabase authentication and row-level security.</p>
      </main>
    </div>
  );
}

function AdminMessage({ title, copy }: { title: string; copy: string }) {
  return <div className="admin-login"><div className="admin-login-mark"><ShieldCheck size={25} /><span>KRUSHI GLOBAL / ADMIN</span></div><h1>{title}</h1><p>{copy}</p><Link className="button" href="/">Return to website</Link></div>;
}
