import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Loan = db.define(
  "peminjaman",
  {
    nama_peminjam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul_buku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_pinjam: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggal_kembali: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Dipinjam",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

// Otomatis membuat tabel di database jika belum ada
// (async () => {
//   await db.sync();
// })();

export default Loan;
