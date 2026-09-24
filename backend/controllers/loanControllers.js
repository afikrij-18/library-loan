import Loan from "../models/loanModel.js";

// Ambil seluruh data peminjaman
export const getLoans = async (req, res) => {
  try {
    const response = await Loan.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil data peminjaman berdasarkan ID
export const getLoanById = async (req, res) => {
  try {
    const response = await Loan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah data peminjaman baru
export const createLoan = async (req, res) => {
  try {
    await Loan.create(req.body);
    res.status(201).json({ message: "Data peminjaman berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ubah data peminjaman berdasarkan ID
export const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!loan) return res.status(404).json({ message: "Data tidak ditemukan" });

    await Loan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Data peminjaman berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hapus data peminjaman berdasarkan ID
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!loan) return res.status(404).json({ message: "Data tidak ditemukan" });

    await Loan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Data peminjaman berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tambah banyak data peminjaman sekaligus (Bulk Create)
export const bulkCreateLoans = async (req, res) => {
  try {
    const dataLoans = req.body;

    // Validasi: pastikan body yang dikirim adalah array dan tidak kosong
    if (!Array.isArray(dataLoans) || dataLoans.length === 0) {
      return res.status(400).json({ message: "Payload harus berupa array data peminjaman!" });
    }

    // Menggunakan Sequelize bulkCreate untuk insert banyak data sekaligus
    const response = await Loan.bulkCreate(dataLoans);

    res.status(201).json({
      message: `Berhasil menambahkan ${response.length} data peminjaman baru`,
      data: response
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};