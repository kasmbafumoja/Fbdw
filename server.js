import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { facebookDownloader } from 'fb-downloader-scraper';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/download', async (req, res) => {
  const { url } = req.body;
  try {
    const result = await facebookDownloader(url);
    res.json({ success: true, downloadUrl: result.hd || result.sd });
  } catch (err) {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}`));
