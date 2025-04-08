async function getReading() {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;
    const focus = document.getElementById("focus").value;
  
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "";
    const loader = document.createElement("div");
    loader.innerText = "✨ Consulting the stars... please wait ✨";
    loader.style.fontStyle = "italic";
    loader.style.color = "#555";
    loader.style.marginTop = "1rem";
    loader.id = "loader";
    outputDiv.appendChild(loader);
  
    try {
      const response = await fetch("https://astro-ai-backend-29ze.onrender.com/astro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, time, place, focus })
      });
  
        const data = await response.json();
        document.getElementById("loader")?.remove();
        const resultText = document.createElement("div");
        resultText.innerText = data.result || "Something went wrong.";
        outputDiv.appendChild(resultText);
    } catch (error) {
        console.error("Client error:", error);
        outputDiv.innerText = "Failed to connect to the server.";
    }
  }
  
