class conversorTemperatura extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const formatoAttr = this.getAttribute("formato") || "C-F";
    const formato = formatoAttr === "F-C" ? "F-C" : "C-F";

    this.shadow.innerHTML = `
            <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css">
            <div class="card bg-dark text-white mb-3" >
                <div class="card-header">Componente Web: Conversor de Temperatura</div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label" for="valor">Valor a convertir</label>
                        <input id="valor" type="number" class="form-control" placeholder="Ingrese número">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="selectFormato">Tipo de conversión</label>
                        <select id="selectFormato" class="form-select">
                            <option value="C-F">Celsius a Fahrenheit (C-F)</option>
                            <option value="F-C">Fahrenheit a Celsius (F-C)</option>
                        </select>
                    </div>

                    <button id="convertir" class="btn btn-primary">Convertir</button>

                    <div id="resultado" class="mt-3"></div>
                </div>
            </div>
        `;

    const input = this.shadow.getElementById("valor");
    const select = this.shadow.getElementById("selectFormato");
    const btn = this.shadow.getElementById("convertir");
    const resultado = this.shadow.getElementById("resultado");

    // Establecer select según el atributo 'formato'
    select.value = formato;

    // Evento convertir
    btn.addEventListener("click", () => {
      const raw = input.value;
      const num = parseFloat(raw);
      if (raw === "" || isNaN(num)) {
        resultado.innerHTML = `<div class="alert alert-warning">Ingrese un número válido</div>`;
        return;
      }

      const opcion = select.value;
      if (opcion === "C-F") {
        const f = (num * 9) / 5 + 32;
        resultado.innerHTML = `<div class="alert alert-success">${num} °C = ${f.toFixed(
          2
        )} °F</div>`;
      } else {
        const c = ((num - 32) * 5) / 9;
        resultado.innerHTML = `<div class="alert alert-success">${num} °F = ${c.toFixed(
          2
        )} °C</div>`;
      }
    });
  }
}
customElements.define("conversor-temperatura", conversorTemperatura);
