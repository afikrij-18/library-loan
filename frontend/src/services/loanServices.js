import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getLoans() {
  const res = await api.get("/peminjaman");
  return res.data;
}

export async function getLoanById(id) {
  const res = await api.get(`/peminjaman/${id}`);
  return res.data;
}

export async function createLoan(data) {
  const res = await api.post("/peminjaman", data);
  return res.data;
}

export async function updateLoan(id, data) {
  const res = await api.patch(`/peminjaman/${id}`, data);
  return res.data;
}


export async function deleteLoan(id) {
  const res = await api.delete(`/peminjaman/${id}`);
  return res.data;
}