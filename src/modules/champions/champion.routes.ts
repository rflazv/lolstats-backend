import { Router } from 'express';
import ChampionController from './champion.controller';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const result = await ChampionController.getAll(req, res);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});           
router.get('/:id', async (req, res) => {
	try {
		const result = await ChampionController.getById(req, res);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});      
router.get('/name/:name', async (req, res) => {
	try {
		const result = await ChampionController.getByName(req, res);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}); 
router.post('/', async (req, res) => {
	try {
		const result = await ChampionController.create(req, res);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});         

export default router;
