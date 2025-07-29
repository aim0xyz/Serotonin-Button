export default async function handler(req, res) {
  const GIPHY_API_KEY = "dc6zaTOxFJmzC"; // Public beta key
  const UNSPLASH_ACCESS_KEY = "DEMO_KEY"; // Placeholder

  const contentSources = [
    async () => {
      const r = await fetch('https://dog.ceo/api/breeds/image/random');
      const d = await r.json();
      return { type: 'image', url: d.message };
    },
    async () => {
      const r = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=funny`);
      const d = await r.json();
      return { type: 'gif', url: d.data.images.original.url };
    },
    async () => {
      const r = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
      const d = await r.json();
      return {
        type: 'text',
        text: d.joke || `${d.setup} — ${d.delivery}`,
      };
    },
    async () => {
      const r = await fetch('https://affirmations.dev/');
      const d = await r.json();
      return { type: 'text', text: d.affirmation };
    },
    async () => {
      const r = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`);
      const d = await r.json();
      return { type: 'image', url: d.urls.regular };
    },
  ];

  try {
    const content = await contentSources[Math.floor(Math.random() * contentSources.length)]();
    res.status(200).json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong 😞' });
  }
}
