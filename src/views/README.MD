# Task Management App

A modern task management application built with **Vue 3**, **TypeScript**, **Pinia**, **PrimeVue**, and **Tailwind CSS**. The application allows users to create, update, delete, search, and organize tasks by status.

---

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Search tasks by title
- Filter tasks by status
- Organize tasks into:
  - Pending
  - In Progress
  - Done
- Form validation
- Responsive design
- Loading state
- Mock API service
- State management using Pinia

---

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia
- PrimeVue
- Tailwind CSS
- Vite

---

## Project Structure

```
src/
│
├── components/
│   └── task/
│
├── services/
│
├── stores/
│
├── types/
│
├── views/
│
├── App.vue
└── main.ts
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Mohamed4Hesham/task-management.git
```

Navigate into the project:

```bash
cd task-management
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```


## Validation Rules

- Title is required.
- Due date is required.
- Past dates are not allowed.

---

## State Management

Pinia is used to manage the application's global state.

The task store handles:

- Fetching tasks
- Creating tasks
- Updating tasks
- Deleting tasks
- Loading state
- Error handling

---

## Notes

- The application currently uses a mock service to simulate API requests.
- Tasks are initialized with sample data for demonstration purposes.
- The architecture is designed so the mock service can easily be replaced with a real backend API.

---

## Author

Mohamed Hesham