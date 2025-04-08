async function getReading() {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;
    const focus = document.getElementById("focus").value;
  
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "Talking to the stars... 🌠";
  
    try {
      const response = await fetch("https://astro-ai-backend-29ze.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, time, place, focus })
      });
  
      const data = await response.json();
      outputDiv.innerText = data.result || "Something went wrong.";
    } catch (error) {
      console.error("Client error:", error);
      outputDiv.innerText = "Failed to connect to the server.";
    }
  }
  
