# CH APP

A collection of small, self-contained web apps. Each one lives in its own folder.

## Projects

### [focus-timer](focus-timer/index.html)
A Pomodoro-style focus timer with a circular progress ring, switchable session lengths (25 / 5 / 15 minutes), and a lightweight to-do list. Session counts and tasks persist in `localStorage`.

### [block-breaker](block-breaker/index.html)
A classic brick-breaker arcade game built with the Canvas API. Move the paddle with the mouse or arrow keys, launch the ball with the mouse or spacebar, and clear levels to progress.

### [particle-doodle](particle-doodle/index.html)
A playful drawing canvas that emits colorful particle trails as you draw. Pick a color and brush size, doodle with mouse or touch, and save your drawing as a PNG.

### [royal-camp-app](royal-camp-app)
A React + Vite + TypeScript camp-notification app (로열캠프 알리미): student signup/login, notices, guidebook, and an admin dashboard. Uses `localStorage`/`sessionStorage` as a stand-in database, so it runs with no backend. See its own [README](royal-camp-app/README.md) for demo credentials.

## Running locally

`focus-timer`, `block-breaker`, and `particle-doodle` need no installation — just open the project's `index.html` file in a browser, for example:

```bash
open focus-timer/index.html
```

`royal-camp-app` is a Vite project and needs Node.js:

```bash
cd royal-camp-app
npm install
npm run dev
```
