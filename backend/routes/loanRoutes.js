import express from "express";
import {
    getLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
    bulkCreateLoans
} from "../controllers/loanControllers.js";

const router = express.Router();

router.get('/peminjaman', getLoans);
router.get('/peminjaman/:id', getLoanById);
router.post('/peminjaman', createLoan);
router.patch('/peminjaman/:id', updateLoan);
router.delete('/peminjaman/:id', deleteLoan);
router.post('/peminjaman/bulk', bulkCreateLoans);

export default router;