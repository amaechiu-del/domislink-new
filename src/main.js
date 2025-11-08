const app = document.getElementById("app");

app.innerHTML = `
  <header class="bg-blue-600 text-white p-6 text-center font-bold text-2xl">
    Domislink International Business Services Ltd
  </header>

  <main class="p-8 text-center">
    <h1 class="text-3xl font-bold mb-4">Welcome to Domislink</h1>
    <p class="text-gray-700 mb-6">
      Smart digital, business, and AI solutions for modern enterprises.
    </p>
    <button class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
      Get Started
    </button>
  </main>

  <footer class="bg-gray-200 p-4 text-center">
    &copy; ${new Date().getFullYear()} Domislink International Business Services Ltd
  </footer>
`;
