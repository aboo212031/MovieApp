# 🎬 React Movie App

A responsive movie browsing web application built using **React**, **Material UI**, and **The Movie Database (TMDb) API**.

---

## 🚀 Features Implemented

- 🔐 User Login Interface (UI only)
- 🔍 Search movies by title with auto-complete
- 🕘 Search history stored in local storage (only after pressing enter)
- 📄 Movie Details Page with poster, overview, genre, cast, and trailer
- ▶️ YouTube Trailer embedded via TMDb/YouTube
- 🔥 Trending Movies section
- 🌗 Light/Dark Mode toggle
- ❤️ Favorites List (stored locally)
- 📅 Filter by Genre, Year, and Rating
- ➕ Load More button for paginated search results
- 📱 Responsive design for all screen sizes
- 🧠 Context API for app-wide state management

---

## 🚀 APIs Implemented

| Purpose                            | Endpoint                                                  |
| ---------------------------------- | --------------------------------------------------------- |
| 🔍 Search movies                   | `GET /search/movie?query={query}`                         |
| 📄 Get movie details               | `GET /movie/{movie_id}`                                   |
| 🎭 Get genres list                 | `GET /genre/movie/list`                                   |
| 🎬 Get full details (cast, videos) | `GET /movie/{movie_id}?append_to_response=videos,credits` |

---

## 🔧 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/react-movie-app.git
cd react-movie-app
```
