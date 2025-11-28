import express from 'express';
import axios from 'axios';

const router = express.Router();

// Get all countries (names)
router.get('/countries', async (req, res) => {
  try {
    const resp = await axios.get('https://countriesnow.space/api/v0.1/countries');
    const data = resp.data?.data || [];
    const countries = data.map(c => c.country);
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Get states by country name
router.get('/states/:country', async (req, res) => {
  try {
    const country = req.params.country;
    const resp = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
      country
    });
    const states = resp.data?.data?.states || [];
    res.json(states); // each { name, state_code }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

// Get cities by country + state name
router.get('/cities/:country/:state', async (req, res) => {
  try {
    const { country, state } = req.params;
    const resp = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
      country,
      state
    });
    const cities = resp.data?.data || [];
    res.json(cities); // array of city names
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

export default router;
