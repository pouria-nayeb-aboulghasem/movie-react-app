# Movie & TV Finder

A React, TypeScript, and Tailwind CSS browser powered by TMDB. Navigate between `/movies` and `/series`; both catalogs support title search, genre filtering, sorting, and pagination. The root path redirects to `/series`.

## Setup

Create a `.env` file in the project root with your TMDB API base URL and API key:

```env
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Then install dependencies and start the development server:

```sh
npm install
npm run dev
```
