// CALCULATOR FOR SOLAR CENTAURY SPA
// Interactive solar and electrical sizing tool

document.addEventListener("DOMContentLoaded", () => {
    initCalculator();
});

function initCalculator() {
    // Listen to changes in the service select or electric bill to update values
    const serviceCheckboxes = document.querySelectorAll('input[name="cr-service-type"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", handleServiceChange);
    });

    const billInput = document.getElementById("cr-bill-amount");
    if (billInput) {
        billInput.addEventListener("input", calculateSolarSizing);
    }

    // Shaking button animation loop
    const shakeBtn = document.getElementById("cr-submit-btn");
    if (shakeBtn) {
        setInterval(() => {
            shakeBtn.classList.add("shake-animation");
            setTimeout(() => {
                shakeBtn.classList.remove("shake-animation");
            }, 1000);
        }, 4000);
    }

    // Form submission
    const form = document.getElementById("cr-cm-main-form");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

// Ensure only one service can be selected
window.selectOnlyOneService = function(checkbox) {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
    handleServiceChange();
};

function handleServiceChange() {
    const selectedService = getSelectedService();
    const billGroup = document.getElementById("bill-sizing-group");
    const commentsLabel = document.getElementById("comments-label");

    if (billGroup) {
        if (selectedService === "Servicio On-Grid" || selectedService === "Servicio Off-Grid" || selectedService === "Servicio Híbrido") {
            billGroup.style.display = "block";
            const billInput = document.getElementById("cr-bill-amount");
            if (billInput) billInput.setAttribute("required", "required");
        } else {
            billGroup.style.display = "none";
            const billInput = document.getElementById("cr-bill-amount");
            if (billInput) billInput.removeAttribute("required");
        }
    }

    if (commentsLabel) {
        if (selectedService === "Servicio On-Grid" || selectedService === "Servicio Off-Grid" || selectedService === "Servicio Híbrido") {
            commentsLabel.textContent = "Indicaciones adicionales del techo (ej: tejas, metal, sombras)";
        } else {
            commentsLabel.textContent = "Detalle del proyecto eléctrico o sistemas de seguridad requeridos";
        }
    }

    calculateSolarSizing();
}

function getSelectedService() {
    const checked = document.querySelector('input[name="cr-service-type"]:checked');
    if (!checked) return null;
    return checked.value;
}

function calculateSolarSizing() {
    const service = getSelectedService();
    const totalM3Span = document.getElementById("cr-total-m3");
    const resultLabel = document.getElementById("cr-result-label");
    const resultDetails = document.getElementById("cr-result-details");

    if (!totalM3Span) return;

    if (!service) {
        totalM3Span.textContent = "0,00 kW";
        if (resultLabel) resultLabel.textContent = "Seleccione un servicio arriba";
        if (resultDetails) resultDetails.style.display = "none";
        return;
    }

    if (service === "Servicio On-Grid" || service === "Servicio Híbrido") {
        const billAmountVal = document.getElementById("cr-bill-amount").value;
        const billAmount = parseFloat(billAmountVal) || 0;

        if (billAmount <= 0) {
            totalM3Span.textContent = "--- kW";
            if (resultLabel) resultLabel.textContent = "Ingrese el valor de su boleta";
            if (resultDetails) resultDetails.style.display = "none";
            return;
        }

        // Temuco: ~$160 CLP per kWh. Peak Sun Hours (HSP): 3.3 hrs/day. Panel capacity: 500W (0.5 kW).
        const monthlyKwh = billAmount / 160;
        const dailyKwh = monthlyKwh / 30;
        const requiredKwp = dailyKwh / 3.3; // Sizing based on HSP
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;

        // Estimated savings: 85% of monthly bill
        const monthlySavings = Math.round(billAmount * 0.85);
        const co2Offset = Math.round(finalKwp * 3.3 * 365 * 0.4); // 0.4 kg CO2 per kWh

        totalM3Span.textContent = `${finalKwp.toFixed(2)} kW`;
        if (resultLabel) resultLabel.textContent = "Dimensionamiento sugerido para On-Grid";

        if (resultDetails) {
            resultDetails.style.display = "block";
            resultDetails.innerHTML = `
                <div class="result-detail-item"><strong>Paneles sugeridos:</strong> <span>${numPanels} paneles de 500W</span></div>
                <div class="result-detail-item"><strong>Ahorro mensual est.:</strong> <span>$ ${monthlySavings.toLocaleString('es-CL')} CLP</span></div>
                <div class="result-detail-item"><strong>Reducción de CO2/año:</strong> <span>${co2Offset.toLocaleString('es-CL')} kg CO2</span></div>
                <div class="result-detail-item-note">💡 Estimación calculada con un promedio de 3.3 Horas de Sol Pico (HSP) para Temuco y Araucanía.</div>
            `;
        }
    } 
    else if (service === "Servicio Off-Grid") {
        const billAmountVal = document.getElementById("cr-bill-amount").value;
        const billAmount = parseFloat(billAmountVal) || 0;

        if (billAmount <= 0) {
            totalM3Span.textContent = "--- kW";
            if (resultLabel) resultLabel.textContent = "Ingrese el valor de su boleta";
            if (resultDetails) resultDetails.style.display = "none";
            return;
        }

        // Temuco: ~$160 CLP per kWh. Peak Sun Hours (HSP): 3.3 hrs/day. Panel capacity: 500W (0.5 kW).
        const monthlyKwh = billAmount / 160;
        const dailyKwh = monthlyKwh / 30;
        const requiredKwp = (dailyKwh / 0.7) / 3.3; // Sizing based on HSP and 30% system losses
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;

        // Battery sizing: 1.2 days autonomy, 90% DoD Lithium
        const batteryKwh = (dailyKwh * 1.2) / 0.9;
        // Inverter sizing
        const suggestedInverterKw = (finalKwp * 1.2 < 3) ? 3 : (finalKwp * 1.2 < 5.5 ? 5 : 8);

        totalM3Span.textContent = `${finalKwp.toFixed(2)} kW`;
        if (resultLabel) resultLabel.textContent = "Dimensionamiento sugerido para Off-Grid";

        if (resultDetails) {
            resultDetails.style.display = "block";
            resultDetails.innerHTML = `
                <div class="result-detail-item"><strong>Paneles sugeridos:</strong> <span>${numPanels} paneles de 500W</span></div>
                <div class="result-detail-item"><strong>Baterías recomendadas:</strong> <span>${batteryKwh.toFixed(1)} kWh (Banco de Litio)</span></div>
                <div class="result-detail-item"><strong>Inversor sugerido:</strong> <span>${suggestedInverterKw} kW (Onda senoidal pura)</span></div>
                <div class="result-detail-item-note">🔋 Diseñado para autonomía residencial con baterías de Litio de ciclo profundo y 3.3 Horas de Sol Pico (HSP).</div>
            `;
        }
    } 
    else {
        // Proyecto Eléctrico or Seguridad
        totalM3Span.textContent = "Por Cotizar";
        if (resultLabel) resultLabel.textContent = "Cotización de servicios profesionales";
        if (resultDetails) {
            resultDetails.style.display = "block";
            resultDetails.innerHTML = `
                <div class="result-detail-item-note">🛠️ Los proyectos eléctricos certificados (SEC) y sistemas de seguridad se cotizan a la medida tras una visita técnica o revisión de planos. Complete sus datos para coordinar.</div>
            `;
        }
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("cr-name").value;
    const phone = document.getElementById("cr-phone").value;
    const email = document.getElementById("cr-email").value;
    const date = document.getElementById("cr-date").value;
    const originComuna = document.getElementById("cr-origin-comuna").value;
    const service = getSelectedService();
    const comments = document.getElementById("cr-comments").value;
    const techumbre = document.getElementById("cr-roof-type").value;
    const sombras = document.getElementById("cr-shadows").value;

    if (!service) {
        alert("Por favor, seleccione el tipo de servicio.");
        return;
    }

    let message = `☀️ *SOLICITUD DE COTIZACIÓN - SOLAR CENTAURY* ☀️\n\n`;
    message += `👤 *Datos de Contacto:*\n`;
    message += `- *Nombre:* ${name}\n`;
    message += `- *WhatsApp/Tel:* ${phone}\n`;
    message += `- *Email:* ${email}\n`;
    message += `- *Comuna:* ${originComuna}\n`;
    message += `- *Fecha Estimada:* ${date}\n\n`;

    message += `🛠️ *Tipo de Solución:* ${service}\n\n`;

    if (service === "Servicio On-Grid" || service === "Servicio Híbrido") {
        const billAmount = document.getElementById("cr-bill-amount").value;
        const monthlyKwh = parseFloat(billAmount) / 160;
        const dailyKwh = monthlyKwh / 30;
        const requiredKwp = dailyKwh / 3.3;
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;
        const monthlySavings = Math.round(parseFloat(billAmount) * 0.85);

        message += `📊 *Estimación Solar (Temuco/Araucanía):*\n`;
        message += `- *Boleta mensual actual:* $ ${parseFloat(billAmount).toLocaleString('es-CL')} CLP\n`;
        message += `- *Consumo mensual est.:* ~${Math.round(monthlyKwh)} kWh/mes\n`;
        message += `- *Tamaño planta sugerida:* ${finalKwp.toFixed(2)} kW\n`;
        message += `- *Cantidad de paneles:* ${numPanels} paneles de 500W\n`;
        message += `- *Ahorro mensual est.:* $ ${monthlySavings.toLocaleString('es-CL')} CLP\n\n`;
    } 
    else if (service === "Servicio Off-Grid") {
        const billAmount = document.getElementById("cr-bill-amount").value;
        const monthlyKwh = parseFloat(billAmount) / 160;
        const dailyKwh = monthlyKwh / 30;
        const requiredKwp = (dailyKwh / 0.7) / 3.3;
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;
        const batteryKwh = (dailyKwh * 1.2) / 0.9;
        const suggestedInverterKw = (finalKwp * 1.2 < 3) ? 3 : (finalKwp * 1.2 < 5.5 ? 5 : 8);

        message += `📊 *Estimación Off-Grid (Consumo Autónomo):*\n`;
        message += `- *Boleta mensual actual:* $ ${parseFloat(billAmount).toLocaleString('es-CL')} CLP\n`;
        message += `- *Consumo diario estimado:* ~${dailyKwh.toFixed(2)} kWh/día\n`;
        message += `- *Tamaño planta sugerida:* ${finalKwp.toFixed(2)} kW\n`;
        message += `- *Cantidad de paneles:* ${numPanels} paneles de 500W\n`;
        message += `- *Banco de baterías:* ${batteryKwh.toFixed(1)} kWh (Litio)\n`;
        message += `- *Inversor sugerido:* ${suggestedInverterKw} kW\n\n`;
    }

    message += `🏠 *Detalles del Entorno:*\n`;
    message += `- *Tipo de Techo:* ${techumbre}\n`;
    message += `- *Presencia de Sombras:* ${sombras}\n`;
    if (comments.trim() !== "") {
        message += `- *Notas/Indicaciones:* ${comments}\n`;
    }

    message += `\n---\n_Mensaje generado automáticamente desde el Cotizador de www.solarcentaury.cl_`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/56920765348?text=${encodedMessage}`;
    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank");
}
