import { Router } from "express";
import PalavrasController from "../Controller/Palavras.controller";

const router = Router()

//get - get id
router.get('/palavras', PalavrasController.findAll)

router.get('/palavras/:id', PalavrasController.findById)

//post
router.post('/palavras', PalavrasController.createPalavra)

//put
router.put('/palavras/:id', PalavrasController.updatePalavra)

//delete
router.delete('/palavras/:id', PalavrasController.deletePalavra)

export { router }