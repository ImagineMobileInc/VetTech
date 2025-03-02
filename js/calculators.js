// js/calculators.js

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
    const unit = document.querySelector('input[name="anesthesia-unit"]:checked').value;
    const drugSelect = document.getElementById('anesthesia-drug');
    const selectedDrug = drugSelect.options[drugSelect.selectedIndex];

    if (!weight) {
        alert('Please enter weight.');
        return;
    }

    // Get drug-specific dose and concentration
    const dose = unit === 'metric' ? 
        parseFloat(selectedDrug.getAttribute('data-dose-metric')) : 
        parseFloat(selectedDrug.getAttribute('data-dose-imperial'));
    const concentration = parseFloat(selectedDrug.getAttribute('data-concentration'));

    // Calculate volume (mL)
    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const totalDrug = weightInKg * dose; // Total drug in mg
    const volume = totalDrug / concentration; // Volume in mL

    document.getElementById('anesthesia-result').innerHTML = `Volume of ${selectedDrug.value.charAt(0).toUpperCase() + selectedDrug.value.slice(1)} to Draw Up: ${volume.toFixed(2)} mL`;
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
    const unit = document.querySelector('input[name="bicarb-unit"]:checked').value;

    if (!weight || !currentHco3 || !targetHco3) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const bicarbDose = 0.3 * weightInKg * (targetHco3 - currentHco3);
    document.getElementById('bicarb-result').innerHTML = `Bicarbonate Dose: ${bicarbDose.toFixed(2)} mEq`;
}

function calculateBSA() {
    const weight = parseFloat(document.getElementById('bsa-weight').value);
    const species = document.getElementById('bsa-species').value;
    const unit = document.querySelector('input[name="bsa-unit"]:checked').value;

    if (!weight) {
        alert('Please enter weight.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const k = species === 'dog' ? 10.1 : 10.0;
    const bsa = k * Math.pow(weightInKg, 2/3) / 100;
    document.getElementById('bsa-result').innerHTML = `BSA: ${bsa.toFixed(2)} m²`;
}

function calculateCombFluids() {
    const vol1 = parseFloat(document.getElementById('combfluids-vol1').value);
    const conc1 = parseFloat(document.getElementById('combfluids-conc1').value);
    const vol2 = parseFloat(document.getElementById('combfluids-vol2').value);
    const conc2 = parseFloat(document.getElementById('combfluids-conc2').value);
    const unit = document.querySelector('input[name="combfluids-unit"]:checked').value;

    if (!vol1 || !conc1 || !vol2 || !conc2) {
        alert('Please enter all values.');
        return;
    }

    let vol1InMl = unit === 'imperial' ? vol1 * 29.5735 : vol1; // oz to mL
    let vol2InMl = unit === 'imperial' ? vol2 * 29.5735 : vol2;
    const finalConc = ((vol1InMl * conc1) + (vol2InMl * conc2)) / (vol1InMl + vol2InMl);
    document.getElementById('combfluids-result').innerHTML = `Final Concentration: ${finalConc.toFixed(2)} %`;
}

function calculateCRI() {
    const weight = parseFloat(document.getElementById('cri-weight').value);
    const dose = parseFloat(document.getElementById('cri-dose').value);
    const conc = parseFloat(document.getElementById('cri-conc').value);
    const unit = document.querySelector('input[name="cri-unit"]:checked').value;

    if (!weight || !dose || !conc) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    let concInMgPerMl = unit === 'imperial' ? conc / 29.5735 : conc; // mg/oz to mg/mL
    const rate = (weightInKg * dose) / (concInMgPerMl * 1000) * 60;
    const rateDisplay = unit === 'imperial' ? rate * 29.5735 : rate; // mL/h to oz/h
    const unitLabel = unit === 'imperial' ? 'oz/h' : 'mL/h';
    document.getElementById('cri-result').innerHTML = `Infusion Rate: ${rateDisplay.toFixed(2)} ${unitLabel}`;
}

function calculateDosing() {
    const weight = parseFloat(document.getElementById('dosing-weight').value);
    const dose = parseFloat(document.getElementById('dosing-dose').value);
    const conc = parseFloat(document.getElementById('dosing-conc').value);
    const unit = document.querySelector('input[name="dosing-unit"]:checked').value;

    if (!weight || !dose || !conc) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    let concInMgPerMl = unit === 'imperial' ? conc / 29.5735 : conc;
    const volume = (weightInKg * dose) / concInMgPerMl;
    const volumeDisplay = unit === 'imperial' ? volume * 29.5735 : volume;
    const unitLabel = unit === 'imperial' ? 'oz' : 'mL';
    document.getElementById('dosing-result').innerHTML = `Volume to Administer: ${volumeDisplay.toFixed(2)} ${unitLabel}`;
}

function calculateDripRate() {
    const volume = parseFloat(document.getElementById('driprate-volume').value);
    const time = parseFloat(document.getElementById('driprate-time').value);
    const dropFactor = parseFloat(document.getElementById('driprate-set').value);
    const unit = document.querySelector('input[name="driprate-unit"]:checked').value;

    if (!volume || !time || !dropFactor) {
        alert('Please enter all values.');
        return;
    }

    let volumeInMl = unit === 'imperial' ? volume * 29.5735 : volume;
    const dripRate = (volumeInMl * dropFactor) / (time * 60);
    document.getElementById('driprate-result').innerHTML = `Drip Rate: ${dripRate.toFixed(2)} drops/min`;
}

function calculateEcho() {
    const lvid = parseFloat(document.getElementById('echo-lvid').value);
    const weight = parseFloat(document.getElementById('echo-weight').value);
    const unit = document.querySelector('input[name="echo-unit"]:checked').value;

    if (!lvid || !weight) {
        alert('Please enter all values.');
        return;
    }

    let lvidInCm = unit === 'imperial' ? lvid * 2.54 : lvid; // in to cm
    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const index = lvidInCm / Math.pow(weightInKg, 1/3);
    const unitLabel = unit === 'imperial' ? 'in/lb^(1/3)' : 'cm/kg^(1/3)';
    document.getElementById('echo-result').innerHTML = `LVID Index: ${index.toFixed(2)} ${unitLabel}`;
}

function calculateEnergy() {
    const weight = parseFloat(document.getElementById('energy-weight').value);
    const status = document.getElementById('energy-status').value;
    const unit = document.querySelector('input[name="energy-unit"]:checked').value;

    if (!weight) {
        alert('Please enter weight.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const rer = 70 * Math.pow(weightInKg, 0.75);
    const energy = status === 'resting' ? rer : rer * 1.5;
    document.getElementById('energy-result').innerHTML = `Energy Requirement: ${energy.toFixed(2)} kcal/day`;
}

function calculateEquineFluids() {
    const weight = parseFloat(document.getElementById('equinefluids-weight').value);
    const dehyd = parseFloat(document.getElementById('equinefluids-dehyd').value);
    const unit = document.querySelector('input[name="equinefluids-unit"]:checked').value;

    if (!weight || !dehyd) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const fluidDeficit = weightInKg * (dehyd / 100) * 1000;
    const fluidDisplay = unit === 'imperial' ? fluidDeficit / 29.5735 : fluidDeficit;
    const unitLabel = unit === 'imperial' ? 'oz' : 'mL';
    document.getElementById('equinefluids-result').innerHTML = `Fluid Deficit: ${fluidDisplay.toFixed(0)} ${unitLabel}`;
}

function calculateFluidPlan() {
    const weight = parseFloat(document.getElementById('fluidplan-weight').value);
    const dehyd = parseFloat(document.getElementById('fluidplan-dehyd').value);
    const hours = parseFloat(document.getElementById('fluidplan-hours').value);
    const unit = document.querySelector('input[name="fluidplan-unit"]:checked').value;

    if (!weight || !dehyd || !hours) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const deficit = weightInKg * (dehyd / 100) * 1000;
    const maint = (50 * weightInKg) / 24 * hours;
    const totalRate = (deficit + maint) / hours;
    const rateDisplay = unit === 'imperial' ? totalRate / 29.5735 : totalRate;
    const unitLabel = unit === 'imperial' ? 'oz/h' : 'mL/h';
    document.getElementById('fluidplan-result').innerHTML = `Fluid Rate: ${rateDisplay.toFixed(2)} ${unitLabel}`;
}

function calculateFeNa() {
    const una = parseFloat(document.getElementById('fena-una').value);
    const pna = parseFloat(document.getElementById('fena-pna').value);
    const ucreat = parseFloat(document.getElementById('fena-ucreat').value);
    const pcreat = parseFloat(document.getElementById('fena-pcreat').value);

    if (!una || !pna || !ucreat || !pcreat) {
        alert('Please enter all values.');
        return;
    }

    const fena = (una / pna) / (ucreat / pcreat) * 100;
    document.getElementById('fena-result').innerHTML = `FeNa: ${fena.toFixed(2)} %`;
}

function calculateMaintFluids() {
    const weight = parseFloat(document.getElementById('maintfluids-weight').value);
    const unit = document.querySelector('input[name="maintfluids-unit"]:checked').value;

    if (!weight) {
        alert('Please enter weight.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const maint = 50 * weightInKg;
    const maintDisplay = unit === 'imperial' ? maint / 29.5735 : maint;
    const unitLabel = unit === 'imperial' ? 'oz/day' : 'mL/day';
    document.getElementById('maintfluids-result').innerHTML = `Maintenance Fluids: ${maintDisplay.toFixed(0)} ${unitLabel}`;
}

function calculateOsmolality() {
    const na = parseFloat(document.getElementById('osmolality-na').value);
    const glucose = parseFloat(document.getElementById('osmolality-glucose').value);
    const bun = parseFloat(document.getElementById('osmolality-bun').value);

    if (!na || !glucose || !bun) {
        alert('Please enter all values.');
        return;
    }

    const osmolality = 2 * na + (glucose / 18) + (bun / 2.8);
    document.getElementById('osmolality-result').innerHTML = `Osmolality: ${osmolality.toFixed(2)} mOsm/kg`;
}

function calculatePercSol() {
    const solute = parseFloat(document.getElementById('percsol-solute').value);
    const volume = parseFloat(document.getElementById('percsol-volume').value);
    const unit = document.querySelector('input[name="percsol-unit"]:checked').value;

    if (!solute || !volume) {
        alert('Please enter all values.');
        return;
    }

    let soluteInG = unit === 'imperial' ? solute * 28.3495 : solute; // oz to g
    let volumeInMl = unit === 'imperial' ? volume * 29.5735 : volume; // fl oz to mL
    const perc = (soluteInG / volumeInMl) * 100;
    document.getElementById('percsol-result').innerHTML = `Concentration: ${perc.toFixed(2)} % w/v`;
}

function calculateTempConv() {
    const temp = parseFloat(document.getElementById('tempconv-value').value);
    const unit = document.getElementById('tempconv-unit').value;

    if (isNaN(temp)) {
        alert('Please enter a temperature.');
        return;
    }

    let result;
    if (unit === 'c-to-f') {
        result = (temp * 9/5) + 32;
        document.getElementById('tempconv-result').innerHTML = `${temp}°C = ${result.toFixed(2)}°F`;
    } else {
        result = (temp - 32) * 5/9;
        document.getElementById('tempconv-result').innerHTML = `${temp}°F = ${result.toFixed(2)}°C`;
    }
}

function calculateTransfusion() {
    const weight = parseFloat(document.getElementById('transfusion-weight').value);
    const hctCurrent = parseFloat(document.getElementById('transfusion-hctcurrent').value);
    const hctTarget = parseFloat(document.getElementById('transfusion-hcttarget').value);
    const unit = document.querySelector('input[name="transfusion-unit"]:checked').value;

    if (!weight || !hctCurrent || !hctTarget) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const donorHct = 40;
    const volume = weightInKg * 70 * (hctTarget - hctCurrent) / donorHct;
    const volumeDisplay = unit === 'imperial' ? volume / 29.5735 : volume;
    const unitLabel = unit === 'imperial' ? 'oz' : 'mL';
    document.getElementById('transfusion-result').innerHTML = `Blood Volume: ${volumeDisplay.toFixed(0)} ${unitLabel}`;
}

function calculateWeightConv() {
    const weight = parseFloat(document.getElementById('weightconv-value').value);
    const unit = document.getElementById('weightconv-unit').value;

    if (!weight) {
        alert('Please enter a weight.');
        return;
    }

    let result;
    if (unit === 'kg-to-lb') {
        result = weight * 2.20462;
        document.getElementById('weightconv-result').innerHTML = `${weight} kg = ${result.toFixed(2)} lb`;
    } else {
        result = weight / 2.20462;
        document.getElementById('weightconv-result').innerHTML = `${weight} lb = ${result.toFixed(2)} kg`;
    }
}

function calculateIVFluidRate() {
    const weight = parseFloat(document.getElementById('ivfluidrate-weight').value);
    const rate = parseFloat(document.getElementById('ivfluidrate-rate').value);
    const unit = document.querySelector('input[name="ivfluidrate-unit"]:checked').value;

    if (!weight || !rate) {
        alert('Please enter all values.');
        return;
    }

    let weightInKg = unit === 'imperial' ? weight / 2.20462 : weight;
    const fluidRate = weightInKg * rate;
    const rateDisplay = unit === 'imperial' ? fluidRate / 29.5735 : fluidRate;
    const unitLabel = unit === 'imperial' ? 'oz/h' : 'mL/h';
    document.getElementById('ivfluidrate-result').innerHTML = `Fluid Rate: ${rateDisplay.toFixed(2)} ${unitLabel}`;
}

function calculateGestation() {
    const breedingDate = new Date(document.getElementById('gestation-date').value);
    const species = document.getElementById('gestation-species').value;

    if (!breedingDate || isNaN(breedingDate)) {
        alert('Please enter a valid date.');
        return;
    }

    const gestationDays = species === 'dog' ? 63 : species === 'cat' ? 65 : 340;
    const dueDate = new Date(breedingDate);
    dueDate.setDate(breedingDate.getDate() + gestationDays);
    document.getElementById('gestation-result').innerHTML = `Due Date: ${dueDate.toISOString().split('T')[0]}`;
}
