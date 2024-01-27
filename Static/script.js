document.addEventListener('DOMContentLoaded', function () {
    const temperatureCalculatorBtn = document.querySelector('.temp-btn');
    const currencyConverterBtn = document.querySelector('.currency-btn');

    temperatureCalculatorBtn.classList.add('active');

    temperatureCalculatorBtn.addEventListener('click', function () {
        showTemperatureCalculator();
    });

    currencyConverterBtn.addEventListener('click', function () {
        showCurrencyConverter();
    });
});

function showTemperatureCalculator() {
    document.querySelector('.temperature-calculator').style.display = 'flex';
    document.querySelector('.currency-converter').style.display = 'none';

    document.querySelector('.temp-btn').classList.add('active');
    document.querySelector('.currency-btn').classList.remove('active');
}

function showCurrencyConverter() {
    document.querySelector('.temperature-calculator').style.display = 'none';
    document.querySelector('.currency-converter').style.display = 'flex';

    document.querySelector('.currency-btn').classList.add('active');
    document.querySelector('.temp-btn').classList.remove('active');
}

function clearTemperature() {
    document.getElementById('inputValue').value = '';
    document.getElementById('inputUnit').value = 'celsius';
    document.getElementById('outputUnit').value = 'celsius';

    document.getElementById('result-value').innerHTML = '';
}

function calculateTemperature() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;

    fetch('/calculate-temperature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input_value: inputValue,
            input_unit: inputUnit,
            output_unit: outputUnit,
        }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result-value').innerHTML = `${data.result}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result-value').innerHTML = 'Error calculating temperature.';
        });
}

function clearCurrency() {
    document.getElementById('currencyInputValue').value = '';
    document.getElementById('currencyInputUnit').value = 'USD';
    document.getElementById('currencyOutputUnit').value = 'USD';

    document.getElementById('currency-result-value').innerHTML = '';
}

function calculateCurrency() {
    const inputValue = parseFloat(document.getElementById('currencyInputValue').value);
    const inputUnit = document.getElementById('currencyInputUnit').value;
    const outputUnit = document.getElementById('currencyOutputUnit').value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${inputUnit}`)
        .then(response => response.json())
        .then(data => {
            let fromExchangeRate = data.conversion_rates[inputUnit];
            let toExchangeRate = data.conversion_rates[outputUnit];
            const convertedAmount = (inputValue / fromExchangeRate) * toExchangeRate;
            document.getElementById('currency-result-value').innerHTML = `${inputValue} ${inputUnit} = ${convertedAmount.toFixed(2)} ${outputUnit}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('currency-result-value').innerHTML = 'Error converting currency.';
        });
}
