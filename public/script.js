async function hentElever() {
  const svar = await fetch("/api/elever");
  const elever = await svar.json();

  const liste = document.getElementById("liste");

  liste.innerHTML = elever.map(elev => `
  <div class="elev-card">
    <div><strong>Elevnr:</strong> ${elev.elevnr}</div>
    <div><strong>Fornavn:</strong> ${elev.fornavn}</div>
    <div><strong>Efternavn:</strong> ${elev.efternavn}</div>

    <button class="slet-btn" onclick="sletElev(${elev.id})">
      Slet
    </button>
  </div>
`).join("");
}

async function gemElev() {
  const elevnr = document.getElementById("elevnr").value;
  const fornavn = document.getElementById("fornavn").value;
  const efternavn = document.getElementById("efternavn").value;

  await fetch("/api/elever", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ elevnr, fornavn, efternavn })
  });

  document.getElementById("elevnr").value = "";
  document.getElementById("fornavn").value = "";
  document.getElementById("efternavn").value = "";

  hentElever();
}

async function sletElev(id) {

  await fetch(`/api/elever/${id}`, {
    method: "DELETE"
  });

  hentElever();
}

hentElever();