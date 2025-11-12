document.addEventListener("DOMContentLoaded", () => {
      console.log("Page loaded — calling API...");
      fetchDataFromAPI();
    });

    // ✅ Function to call your API
    async function fetchDataFromAPI() {
      try {
        const response = await fetch('http://localhost:8080/article/get-all-article');
        const data = await response.json();
        console.log("Data fetched from API:", data);
        // displayPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("posts").innerHTML = "<p>Failed to load data</p>";
      }
    }