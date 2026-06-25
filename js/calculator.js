// CALCULATOR FOR SOLAR CENTAURY SPA
// Interactive solar and electrical sizing tool

// List of appliances for Off-Grid sizing
const appliances = {
    lineaBlanca: {
        title: "Línea Blanca",
        icon: "❄️",
        items: [
            { id: "refri", name: "Refrigerador A++ (Eficiente)", power: 150, hours: 10, qty: 0 },
            { id: "micro", name: "Horno Microondas", power: 1200, hours: 0.5, qty: 0 },
            { id: "lavadora", name: "Lavadora de Ropa", power: 500, hours: 1, qty: 0 },
            { id: "hervidor", name: "Hervidor Eléctrico", power: 1500, hours: 0.3, qty: 0 }
        ]
    },
    iluminacion: {
        title: "Iluminación y Conectividad",
        icon: "💡",
        items: [
            { id: "led_int", name: "Ampolletas LED Interior", power: 9, hours: 6, qty: 0 },
            { id: "led_ext", name: "Focos LED Exterior", power: 30, hours: 10, qty: 0 },
            { id: "router", name: "Router WiFi / Modem", power: 15, hours: 24, qty: 0 },
            { id: "celular", name: "Cargadores de Celular", power: 10, hours: 3, qty: 0 }
        ]
    },
    entretenimiento: {
        title: "Entretenimiento y Computación",
        icon: "🖥️",
        items: [
            { id: "tv", name: "Televisor LED / Smart TV", power: 80, hours: 4, qty: 0 },
            { id: "notebook", name: "Computador Notebook", power: 65, hours: 5, qty: 0 },
            { id: "consola", name: "Consola de Videojuegos", power: 150, hours: 3, qty: 0 }
        ]
    },
    herramientas: {
        title: "Bombas y Motores",
        icon: "🚰",
        items: [
            { id: "bomba_05", name: "Bomba de Agua 0.5 HP", power: 375, hours: 2, qty: 0 },
            { id: "bomba_10", name: "Bomba de Agua 1.0 HP", power: 750, hours: 2, qty: 0 }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initCalculator();
});

function initCalculator() {
    const appContainer = document.getElementById("calculator-app");
    if (!appContainer) return;

    // Render the categories and items dynamically
    let html = "";
    for (const [key, cat] of Object.entries(appliances)) {
        html += `
        <details class="cr-cm-section">
            <summary>
                <span>${cat.icon} ${cat.title}</span>
                <span class="category-summary-qty" id="sum-${key}">0 equipos</span>
            </summary>
            <div class="appliance-list-grid">
        `;

        cat.items.forEach(item => {
            html += `
                <div class="appliance-card">
                    <div class="appliance-info">
                        <span class="appliance-name">${item.name}</span>
                        <span class="appliance-details">${item.power}W · ~${item.hours} hrs/día</span>
                    </div>
                    <div class="appliance-control">
                        <button type="button" class="btn-qty btn-qty-minus" onclick="updateApplianceQty('${key}', '${item.id}', -1)">-</button>
                        <input type="number" class="input-qty" id="qty-${item.id}" value="0" min="0" readonly>
                        <button type="button" class="btn-qty btn-qty-plus" onclick="updateApplianceQty('${key}', '${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        </details>
        `;
    }
    appContainer.innerHTML = html;

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
    const inventoryGroup = document.getElementById("inventory-sizing-group");
    const commentsLabel = document.getElementById("comments-label");

    if (billGroup) {
        if (selectedService === "Servicio On-Grid" || selectedService === "Servicio Híbrido") {
            billGroup.style.display = "block";
            const billInput = document.getElementById("cr-bill-amount");
            if (billInput) billInput.setAttribute("required", "required");
        } else {
            billGroup.style.display = "none";
            const billInput = document.getElementById("cr-bill-amount");
            if (billInput) billInput.removeAttribute("required");
        }
    }

    if (inventoryGroup) {
        if (selectedService === "Servicio Off-Grid") {
            inventoryGroup.style.display = "block";
        } else {
            inventoryGroup.style.display = "none";
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

window.updateApplianceQty = function(catKey, itemId, delta) {
    const cat = appliances[catKey];
    const item = cat.items.find(i => i.id === itemId);
    if (!item) return;

    item.qty = Math.max(0, item.qty + delta);
    
    // Update input display
    const input = document.getElementById(`qty-${itemId}`);
    if (input) input.value = item.qty;

    // Update category header summary
    const catTotalQty = cat.items.reduce((sum, i) => sum + i.qty, 0);
    const summarySpan = document.getElementById(`sum-${catKey}`);
    if (summarySpan) {
        summarySpan.textContent = `${catTotalQty} equipo${catTotalQty !== 1 ? 's' : ''}`;
        if (catTotalQty > 0) {
            summarySpan.classList.add("has-items");
        } else {
            summarySpan.classList.remove("has-items");
        }
    }

    calculateSolarSizing();
};

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
        // Calculate daily Wh consumption
        let totalWh = 0;
        let activeItems = [];
        
        for (const cat of Object.values(appliances)) {
            cat.items.forEach(item => {
                if (item.qty > 0) {
                    totalWh += item.qty * item.power * item.hours;
                    activeItems.push({ name: item.name, qty: item.qty, wh: item.qty * item.power * item.hours });
                }
            });
        }

        if (totalWh === 0) {
            totalM3Span.textContent = "0,00 kWh/día";
            if (resultLabel) resultLabel.textContent = "Seleccione electrodomésticos en el paso 3";
            if (resultDetails) resultDetails.style.display = "none";
            return;
        }

        const dailyKwh = totalWh / 1000;
        // Offgrid losses: 30% -> generation needed: totalWh / 0.7. Temuco HSP: 3.3
        const requiredKwp = (totalWh / 0.7) / 1000 / 3.3;
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;

        // Battery sizing: 1 day autonomy, 90% DoD Lithium
        const batteryKwh = dailyKwh / 0.9;
        // Inverter sizing: Sum of max simultaneous loads * safety factor
        let maxLoad = 0;
        for (const cat of Object.values(appliances)) {
            cat.items.forEach(item => {
                if (item.qty > 0) {
                    // Refrigerators and pumps have starting peaks (x3 power)
                    let multiplier = (item.id === "refri" || item.id.startsWith("bomba")) ? 2.5 : 1.0;
                    maxLoad += item.qty * item.power * multiplier;
                }
            });
        }
        const suggestedInverterKw = maxLoad < 1500 ? 3 : (maxLoad < 3500 ? 5 : 8);

        totalM3Span.textContent = `${dailyKwh.toFixed(2)} kWh/día`;
        if (resultLabel) resultLabel.textContent = "Consumo eléctrico y dimensionamiento Off-Grid";

        if (resultDetails) {
            resultDetails.style.display = "block";
            resultDetails.innerHTML = `
                <div class="result-detail-item"><strong>Paneles sugeridos:</strong> <span>${numPanels} paneles de 500W (${finalKwp.toFixed(1)} kW)</span></div>
                <div class="result-detail-item"><strong>Baterías recomendadas:</strong> <span>${batteryKwh.toFixed(1)} kWh (Banco de Litio)</span></div>
                <div class="result-detail-item"><strong>Inversor sugerido:</strong> <span>${suggestedInverterKw} kW (Onda senoidal pura)</span></div>
                <div class="result-detail-item-note">🔋 Diseñado con 1 día de autonomía. Se recomiendan baterías de Litio de ciclo profundo por su mayor vida útil y eficiencia.</div>
            `;
        }
    } 
    else {
        // Projecto Electrico or Seguridad
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
        let totalWh = 0;
        let itemsList = "";

        for (const cat of Object.values(appliances)) {
            cat.items.forEach(item => {
                if (item.qty > 0) {
                    totalWh += item.qty * item.power * item.hours;
                    itemsList += `  • ${item.qty}x ${item.name} (${item.power}W · ${item.hours}h/d)\n`;
                }
            });
        }

        const dailyKwh = totalWh / 1000;
        const requiredKwp = (totalWh / 0.7) / 1000 / 3.3;
        const numPanels = Math.max(2, Math.ceil(requiredKwp / 0.5));
        const finalKwp = numPanels * 0.5;
        const batteryKwh = dailyKwh / 0.9;

        message += `📊 *Estimación Off-Grid (Consumo Autónomo):*\n`;
        message += `- *Consumo estimado:* ${dailyKwh.toFixed(2)} kWh/día\n`;
        message += `- *Paneles solares:* ${numPanels} paneles de 500W (${finalKwp.toFixed(1)} kW)\n`;
        message += `- *Banco de baterías:* ${batteryKwh.toFixed(1)} kWh (Litio)\n`;
        message += `*Detalle de consumos seleccionados:*\n${itemsList}\n`;
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
