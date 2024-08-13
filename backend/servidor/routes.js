import { Router } from 'express';
import { processRequest, requestScraping, sendMail } from './service.js';
const router = Router();

router.post('/notify', async (req, res) => {
  const { name, email, model, price, range } = req.body;

  if (processRequest(model)) {
    try {
      const data = await requestScraping(model,price,range);
      if (data == null) {
        return res.status(400).json({ message: 'Falha ao localizar arquivos scraping' });
      }
      await sendMail(email,`Resultado da pesquisa`, JSON.stringify(data), name);
      return res.status(200).json({ message: 'Dados recebidos com sucesso!' });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: 'Erro ao processar a solicitação' });
    }
  }

  return res.status(400).json({ message: 'Modelo não processado' });
});

export default router;
