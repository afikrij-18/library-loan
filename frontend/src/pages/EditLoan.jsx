import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { getLoanById, updateLoan } from "../services/loanServices";

function EditLoan() {
    // Tugas 8 & 13: Menggunakan useParams() untuk memperoleh ID dari URL dan useNavigate() untuk navigasi programatis
    const { id } = useParams();
    const navigate = useNavigate();

    // Tugas 12 & 18: State untuk menampung data form peminjaman yang akan diedit
    const [formData, setFormData] = useState({
        nama_peminjam: "",
        judul_buku: "",
        kategori: "",
        tanggal_pinjam: "",
        tanggal_kembali: "",
        status: "Dipinjam",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Tugas 18: Mengambil data berdasarkan ID saat halaman pertama kali dibuka (useEffect)
    useEffect(() => {
        async function fetchLoanData() {
            try {
                setLoading(true);
                // Memanggil service layer untuk mendapatkan data single loan berdasarkan ID
                const data = await getLoanById(id);
                // Mengisi state form dengan data lama dari database agar tampil pada form (Tugas 18)
                setFormData({
                    nama_peminjam: data.nama_peminjam || "",
                    judul_buku: data.judul_buku || "",
                    kategori: data.kategori || "",
                    tanggal_pinjam: data.tanggal_pinjam || "",
                    tanggal_kembali: data.tanggal_kembali || "",
                    status: data.status || "Dipinjam",
                });
            } catch (err) {
                setError("Gagal memuat data peminjaman untuk diedit.");
            } finally {
                setLoading(false);
            }
        }
        fetchLoanData();
    }, [id]);

    // Tugas 12: handleChange() untuk mengelola perubahan input form secara terkontrol (controlled form)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Tugas 18 & 19: handleSubmit() untuk validasi dan mengirim data menggunakan PATCH
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi Wajib (Tugas 19): Pastikan tidak ada field kosong
        if (
            !formData.nama_peminjam ||
            !formData.judul_buku ||
            !formData.kategori ||
            !formData.tanggal_pinjam ||
            !formData.tanggal_kembali ||
            !formData.status
        ) {
            setError("Semua field wajib diisi!");
            return;
        }

        // Validasi Tambahan: Tanggal kembali tidak boleh lebih awal dari tanggal pinjam
        if (new Date(formData.tanggal_kembali) < new Date(formData.tanggal_pinjam)) {
            setError("Tanggal kembali tidak boleh lebih awal dari tanggal pinjam!");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // Mengirim data menggunakan metode PATCH melalui service layer (Tugas 14 & 18)
            await updateLoan(id, formData);

            // Tugas 13 & 18: Navigasi kembali ke halaman utama setelah berhasil
            navigate("/");
        } catch (err) {
            setError("Gagal memperbarui data peminjaman.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Tombol Navigasi Kembali */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 text-sm transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Daftar Peminjaman
            </Link>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                {/* Header Form */}
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Peminjaman Buku</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Perbarui informasi data peminjaman buku perpustakaan pada formulir di bawah ini.
                        </p>
                    </div>
                </div>

                {/* Pesan Error (Conditional Rendering Error) */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Nama Peminjam */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Nama Peminjam <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                name="nama_peminjam"
                                value={formData.nama_peminjam}
                                onChange={handleChange}
                                placeholder="Contoh: Budi Santoso"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                        </div>
                    </div>

                    {/* Input Judul Buku */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Judul Buku <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <BookOpen className="absolute left-3.5 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                name="judul_buku"
                                value={formData.judul_buku}
                                onChange={handleChange}
                                placeholder="Masukkan judul buku"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                        </div>
                    </div>

                    {/* Input Kategori Buku */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Kategori Buku <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        >
                            <option value="">Pilih Kategori Buku...</option>
                            <option value="Fiksi Sastra">Fiksi Sastra</option>
                            <option value="Sains & Teknologi">Sains & Teknologi</option>
                            <option value="Sejarah & Budaya">Sejarah & Budaya</option>
                            <option value="Self Development">Self Development</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    {/* Input Tanggal Pinjam & Kembali */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Tanggal Pinjam <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    name="tanggal_pinjam"
                                    value={formData.tanggal_pinjam}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Tanggal Kembali <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    name="tanggal_kembali"
                                    value={formData.tanggal_kembali}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Input Status Peminjaman */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Status Peminjaman <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        >
                            <option value="Dipinjam">Dipinjam</option>
                            <option value="Dikembalikan">Dikembalikan</option>
                        </select>
                    </div>

                    {/* Tombol Aksi Form */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                        <Link
                            to="/"
                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-teal-300 hover:bg-teal-400 text-teal-950 font-semibold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50"
                        >
                            {loading ? "Menyimpan..." : "Perbarui Peminjaman"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditLoan;