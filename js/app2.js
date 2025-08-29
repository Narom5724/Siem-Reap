// Hambuger
const navbar = document.querySelector(".responsive-nav");
const hambuger = document.querySelector(".hambuger");
hambuger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Search functionality
document.getElementById("search-btn").addEventListener("click", function () {
  let query = document.getElementById("search-box").value.toLowerCase().trim();

  // All elements you want to search (title + description)
  let sections = document.querySelectorAll(".detail, .content-province, .about, .contact");

  let found = false;

  sections.forEach(section => {
    let text = section.innerText.toLowerCase();

    if (text.includes(query) && query !== "") {
      section.style.display = "block";
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      found = true;
    } else {
      section.style.display = "none";
    }
  });

  if (!found && query !== "") {
    alert("❌ No results found for: " + query);
  }

  if (query === "") {
    // reset if empty
    sections.forEach(section => {
      section.style.display = "block";
    });
  }
});

// Also allow "Enter" key in search input
document.getElementById("search-box").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

let pages = [];
const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");

// Load pages from PHP
async function loadPages() {
  const res = await fetch("./search.php");
  pages = await res.json();
  displayResults(pages, "");
}

// Show results
function displayResults(list, query) {
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = "<li style='color:red;'>❌ No results found</li>";
    return;
  }

  list.forEach(page => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = page.url;

    if (query) {
      const regex = new RegExp(`(${query})`, "gi");
      link.innerHTML = page.name.replace(regex, "<mark>$1</mark>");
    } else {
      link.textContent = page.name;
    }

    li.appendChild(link);
    results.appendChild(li);
  });
}

// Search
searchBox.addEventListener("input", function () {
  const query = searchBox.value.toLowerCase();
  const filtered = pages.filter(page =>
    page.name.toLowerCase().includes(query) ||
    page.content.includes(query)
  );
  displayResults(filtered, query);
});

// Init
loadPages();
