import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";

const LoanTable = ({ loading, peminjaman = [], onDelete }) => {
  // Fungsi helper untuk mendapatkan inisial nama (contoh: "Budi Santoso" -> "BS")
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto border border-slate-200 rounded-lg overflow-x-auto shadow-sm bg-white max-h-180 overflow-y-auto">
      <table className="w-full text-left border-collapse">
        <thead className="text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 whitespace-nowrap sticky top-0 z-10 bg-slate-50">
          <tr>
            <th className="px-2 py-3">No</th>
            <th className="px-2 py-3">Peminjam</th>
            <th className="px-2 py-3">Judul Buku</th>
            <th className="px-2 py-3">Kategori</th>
            <th className="px-2 py-3">Tanggal Pinjam</th>
            <th className="px-2 py-3">Tanggal Kembali</th>
            <th className="px-2 py-3">Status</th>
            <th className="px-2 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-100">
          {loading ? (
            <tr>
              <td className="px-2 py-8 text-center text-slate-500" colSpan={8}>
                <span className="loading loading-spinner loading-md align-middle mr-2"></span>
                Memuat data ...
              </td>
            </tr>
          ) : peminjaman.length === 0 ? (
            <tr>
              <td className="px-2 py-8 text-center text-slate-500" colSpan={8}>
                Belum ada data peminjaman.
              </td>
            </tr>
          ) : (
            peminjaman.map((peminjam, index) => (
              <tr className="hover:bg-slate-50/80 transition-colors" key={peminjam.id}>
                {/* Nomor Urut */}
                <td className="px-2 py-3 font-medium text-slate-400">
                  #{index + 1}
                </td>

                {/* Kolom Peminjam dengan Avatar */}
                <td className="px-2 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center border border-slate-200">
                      {getInitials(peminjam.nama_peminjam)}
                    </div>
                    <span className="font-medium text-slate-900">
                      {peminjam.nama_peminjam}
                    </span>
                  </div>
                </td>

                {/* Judul Buku */}
                <td className="px-2 py-3 text-slate-700 font-normal">
                  {peminjam.judul_buku}
                </td>

                {/* Kategori Badge */}
                <td className="px-2 py-3 whitespace-nowrap">
                  <span className="inline-block px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
                    {peminjam.kategori}
                  </span>
                </td>

                {/* Tanggal Pinjam */}
                <td className="px-2 py-3 text-slate-600 whitespace-nowrap">
                  {peminjam.tanggal_pinjam}
                </td>

                {/* Tanggal Kembali */}
                <td className="px-2 py-3 text-slate-600 whitespace-nowrap">
                  {peminjam.tanggal_kembali}
                </td>

                {/* Status Badge */}
                <td className="px-2 py-3 whitespace-nowrap">
                  {peminjam.status === "Dikembalikan" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Dikembalikan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      Dipinjam
                    </span>
                  )}
                </td>

                {/* Tombol Aksi (Menggunakan Lucide React Icons) */}
                <td className="px-2 py-3 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/peminjaman/${peminjam.id}/edit`}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(peminjam.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;