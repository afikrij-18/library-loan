import { useState } from "react";
import { Navigate, useNavigate } from "react-router"

const CreateLoan = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_peminjam: "",
    judul_buku: "",
    kategori: "",
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: ""
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

}