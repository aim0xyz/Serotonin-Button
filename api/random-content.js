const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const sources = [
    getGiphy,
    getUnsplash,
    getCompliment,
    getQuote,
    getYesNo,
    getCat,
    getBoredIdea,
    getUselessFact,
  ];

  const source = sources[Math.floor(Math.random() * sources.length)];
  try {
    const result = await source();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.', detail: error.message });
  }
};

// GIPHY (requires public API key)
async function getGiphy() {
  const apiKey = process.env.GIPHY_API_KEY || 'dc6zaTOxFJmzC';
  const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=pg`);
  const data = await res.json();
  return { type: 'gif', url: data.data.images.original.url };
}

// Unsplash via source.unsplash.com (no key needed)
async function getUnsplash() {
  const width = 800;
  const height = 600;
  const url = `https://source.unsplash.com/random/${width}x${height}`;
  return { type: 'image', url };
}

// Complimentr
async function getCompliment() {
  const res = await fetch('https://complimentr.com/api');
  const data = await res.json();
  return { type: 'text', text: data.compliment };
}

// Quotable
async function getQuote() {
  const res = await fetch('https://api.quotable.io/random');
  const data = await res.json();
  return { type: 'text', text: `“${data.content}” — ${data.author}` };
}

// YesNo.wtf
async function getYesNo() {
  const res = await fetch('https://yesno.wtf/api');
  const data = await res.json();
  return { type: 'gif', url: data.image };
}

// Cataas (Cat as a service)
async function getCat() {
  const url = 'https://cataas.com/cat?json=true';
  const res = await fetch(url);
  const data = await res.json();
  return { type: 'image', url: `https://cataas.com${data.url}` };
}

// Bored API
async function getBoredIdea() {
  const res = await fetch('https://www.boredapi.com/api/activity');
  const data = await res.json();
  return { type: 'text', text: `Try this: ${data.activity}` };
}

// Useless Facts
async function getUselessFact() {
  const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const data = await res.json();
  return { type: 'text', text: data.text };
}
