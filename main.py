from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/calculate-temperature', methods=['POST'])
def calculate_temperature():
    try:
        # Get data from the request
        data = request.get_json()

        # Extract input values
        input_value = float(data['input_value'])
        input_unit = data['input_unit']
        output_unit = data['output_unit']

        # Perform the temperature conversion
        result = convert_temperature(input_value, input_unit, output_unit)

        # Return the result
        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def convert_temperature(value, input_unit, output_unit):
    # Conversion logic
    if input_unit == 'celsius':
        if output_unit == 'fahrenheit':
            return (value * 9/5) + 32
        elif output_unit == 'kelvin':
            return value + 273.15
        else:
            return value

    elif input_unit == 'fahrenheit':
        if output_unit == 'celsius':
            return (value - 32) * 5/9
        elif output_unit == 'kelvin':
            return (value - 32) * 5/9 + 273.15
        else:
            return value

    elif input_unit == 'kelvin':
        if output_unit == 'celsius':
            return value - 273.15
        elif output_unit == 'fahrenheit':
            return (value - 273.15) * 9/5 + 32
        else:
            return value

if __name__ == '__main__':
    app.run(debug=True, port=5500)

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({'error': str(e)}), 500


