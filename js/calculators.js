function calculateAAGradient() {
    const fio2 = parseFloat(document.getElementById('aagradient-fio2').value);
    const patm = parseFloat(document.getElementById('aagradient-patm').value);
    const paco2 = parseFloat(document.getElementById('aagradient-paco2').value);
    const pao2 = parseFloat(document.getElementById('aagradient-pao2').value);

    if (!fio2 || !patm || !paco2 || !pao2) {
        alert('Please enter all values.');
        return;
    }

    const ph2o = 47; // Water vapor pressure at 37°C
    const gradient = (fio2 / 100 * (patm - ph2o) - (paco2 / 0.8)) - pao2;
    document.getElementById('aagradient-result').innerHTML = `A-a Gradient: ${gradient.toFixed(2)} mmHg`;
}

function calculateAnesthesia() {
    const weight = parseFloat(document.getElementById('anesthesia-weight').value);
    const dose = parseFloat(document.getElementById('anesthesia-dose').value);

    if (!weight || !dose) {
        alert('Please enter all values.');
        return;
    }

    const totalDrug = weight * dose;
    document.getElementById('anesthesia-result').innerHTML = `Total Drug: ${totalDrug.toFixed(2)} mg`;
}

function calculateAnionGap() {
    const na = parseFloat(document.getElementById('aniongap-na').value);
    const cl = parseFloat(document.getElementById('aniongap-cl').value);
    const hco3 = parseFloat(document.getElementById('aniongap-hco3').value);

    if (!na || !cl || !hco3) {
        alert('Please enter all values.');
        return;
    }

    const anionGap = na - (cl + hco3);
    document.getElementById('aniongap-result').innerHTML = `Anion Gap: ${anionGap.toFixed(2)} mEq/L`;
}

function calculateBloodGas() {
    const ph = parseFloat(document.getElementById('bloodgas-ph').value);
    const pco2 = parseFloat(document.getElementById('bloodgas-pco2').value);
    const hco3 = parseFloat(document.getElementById('bloodgas-hco3').value);

    if (!ph || !pco2 || !hco3) {
        alert('Please enter all values.');
        return;
    }

    let result = '';
    if (ph < 7.35) {
        if (pco2 > 45) result = 'Respiratory Acidosis';
        else if (hco3 < 22) result = 'Metabolic Acidosis';
    } else if (ph > 7.45) {
        if (pco2 < 35) result = 'Respiratory Alkalosis';
        else if (hco3 > 26) result = 'Metabolic Alkalosis';
    } else {
        result = 'Normal';
    }
    document.getElementById('bloodgas-result').innerHTML = `Result: ${result}`;
}

function calculateBicarb() {
    const weight = parseFloat(document.getElementById('bicarb-weight').value);
    const currentHco3 = parseFloat(document.getElementById('bicarb-hco3').value);
    const targetHco3 = parseFloat(document.getElementById('bicarb-target').value);

    if (!weight || !currentHco3 || !targetHco3) {
        alert('Please enter all values.');
        return;
    }

    const bicarbDose = 0.3 * weight * (targetHco3 - currentHco3);
    document.getElementById('bicarb-result').innerHTML = `Bicarbonate Dose: ${bicarbDose.toFixed(2)} mEq`;
}

function calculateBSA() {
    const weight = parseFloat(document.getElementById('bsa-weight').value);
    const species = document.getElementById('bsa-species').value;

    if (!weight) {
        alert('Please enter weight.');
        return;
    }

    const k = species === 'dog' ? 10.1 : 10.0; // K constant for dogs or cats
    const bsa = k * Math.pow(weight, 2/3) / 100;
    document.getElementById('bsa-result').innerHTML = `BSA: ${bsa.toFixed(2)} m²`;
}

function calculateCombFluids() {
    const vol1 = parseFloat(document.getElementById('combfluids-vol1').value);
    const conc1 = parseFloat(document.getElementById('combfluids-conc1').value);
    const vol2 = parseFloat(document.getElementById('combfluids-vol2').value);
    const conc2 = parseFloat(document.getElementById('combfluids-conc2').value);

    if (!vol1 || !conc1 || !vol2 || !conc2) {
        alert('Please enter all values.');
        return;
    }

    const finalConc = ((vol1 * conc1) + (vol2 * conc2)) / (vol1 + vol2);
    document.getElementById('combfluids-result').innerHTML = `Final Concentration: ${finalConc.toFixed(2)} %`;
}

function calculateCRI() {
    const weight = parseFloat(document.getElementById('cri-weight').value);
    const dose = parseFloat(document.getElementById('cri-dose').value);
    const conc = parseFloat(document.getElementById('cri-conc').value);

    if (!weight || !dose || !conc) {
        alert('Please enter all values.');
        return;
    }

    const rate = (weight * dose) / (conc * 1000) * 60; // Convert μg to mg
    document.getElementById('cri-result').innerHTML = `Infusion Rate: ${rate.toFixed(2)} mL/h`;
}

function calculateDosing() {
    const weight = parseFloat(document.getElementById('dosing-weight').value);
    const dose = parseFloat(document.getElementById('dosing-dose').value);
    const conc = parseFloat(document.getElementById('dosing-conc').value);

    if (!weight || !dose || !conc) {
        alert('Please enter all values.');
        return;
    }

    const volume = (weight * dose) / conc;
    document.getElementById('dosing-result').innerHTML = `Volume to Administer: ${volume.toFixed(2)} mL`;
}

function calculateDripRate() {
    const volume = parseFloat(document.getElementById('driprate-volume').value);
    const time = parseFloat(document.getElementById('driprate-time').value);
    const dropFactor = parseFloat(document.getElementById('driprate-set').value);

    if (!volume || !time || !dropFactor) {
        alert('Please enter all values.');
        return;
    }

    const dripRate = (volume * dropFactor) / (time * 60);
    document.getElementById('driprate-result').innerHTML = `Drip Rate: ${dripRate.toFixed(2)} drops/min`;
}
