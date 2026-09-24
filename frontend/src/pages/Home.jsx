import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, Hourglass, CheckCircle2, Search, RotateCcw, Plus } from "lucide-react";
import LoanTable from "../components/LoanTable";
import { deleteLoan, getLoans } from "../services/loanServices";

function Home() {
  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk pencarian dan filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  useEffect(() => {
    async function getPeminjaman() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await getLoans();
        setPeminjaman(data);
      } catch (error) {
        setError("Gagal memuat data peminjaman.");
      } finally {
        setLoading(false);
      }
    }
    getPeminjaman();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Hapus Data ini?")) return;
    try {
      setError("");
      await deleteLoan(id);
      const remainingLoans = peminjaman.filter((k) => k.id !== id);
      setPeminjaman(remainingLoans);
    } catch (error) {
      setError("Gagal menghapus data peminjaman.");
    }
  }

  // Hitung statistik secara dinamis
  const totalPeminjaman = peminjaman.length;
  const sedangDipinjam = peminjaman.filter((item) => item.status === "Dipinjam").length;
  const sudahDikembalikan = peminjaman.filter((item) => item.status === "Dikembalikan").length;

  // Ambil daftar kategori unik untuk dropdown filter
  const categories = ["Semua", ...new Set(peminjaman.map((item) => item.kategori))];

  // Filter data berdasarkan pencarian, status, dan kategori
  const filteredPeminjaman = peminjaman.filter((item) => {
    const matchesSearch = 
      item.nama_peminjam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.judul_buku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Semua" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "Semua" || item.kategori === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("Semua");
    setCategoryFilter("Semua");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-[3%]">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Card Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">TOTAL PEMINJAMAN</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{totalPeminjaman}</h3>
              <span className="text-sm text-slate-500">Transaksi</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">SEDANG DIPINJAM</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{sedangDipinjam}</h3>
              <span className="text-sm text-slate-500">Buku</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            <Hourglass className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">SUDAH DIKEMBALIKAN</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{sudahDikembalikan}</h3>
              <span className="text-sm text-slate-500">Buku</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar di atas Tabel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 mb-6">
        {/* Input Pencarian */}
        <div className="flex-1 min-w-[280px] relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama peminjam, judul buku, atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
          <span className="absolute right-3.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 rounded border border-slate-300/50">
            ⌘K
          </span>
        </div>

        {/* Filter Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        >
          <option value="Semua">Semua Status</option>
          <option value="Dipinjam">Dipinjam</option>
          <option value="Dikembalikan">Dikembalikan</option>
        </select>

        {/* Filter Kategori */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === "Semua" ? "Semua Kategori" : cat}
            </option>
          ))}
        </select>

        {/* Tombol Reset */}
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        {/* Tombol Tambah Peminjaman (Menggantikan Export CSV) */}
        <Link
          to="/peminjaman/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-300 hover:bg-teal-400 text-teal-950 font-medium rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Peminjaman</span>
        </Link>
      </div>

      {/* Tabel Data Peminjaman */}
      <LoanTable 
        peminjaman={filteredPeminjaman}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;