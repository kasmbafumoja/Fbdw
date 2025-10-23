document.getElementById("downloadBtn").addEventListener("click", async () => {
  const url = document.getElementById("videoUrl").value;
  const resultDiv = document.getElementById("result");

  if (!url.includes("facebook.com")) {
    resultDiv.innerHTML = "<p style='color:red;'>Lien Facebook invalide ❌</p>";
    return;
  }

  resultDiv.innerHTML = "<p>⏳ Téléchargement en cours...</p>";

  try {
    const response = await fetch("/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();

    if (data.success) {
      resultDiv.innerHTML = `<a href="${data.downloadUrl}" target="_blank">🎬 Télécharger la vidéo</a>`;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>Erreur lors du téléchargement 😢</p>";
    }
  } catch {
    resultDiv.innerHTML = "<p style='color:red;'>Erreur de connexion ⚠️</p>";
  }
});
