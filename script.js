document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');
    
    // Check if there's saved form data in sessionStorage
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
        const data = JSON.parse(savedFormData);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const input = form.querySelector(`[name=${key}]`);
                if (input) {
                    input.value = data[key];
                }
            }
        }
    }

    document.getElementById('showPickerButton').addEventListener('click', function() {
        document.getElementById('pickerContainer').classList.remove('hidden');
    });

    document.getElementById('itemPicker').addEventListener('change', function() {
        const item = this.value;
        const dynamicInputs = document.getElementById('dynamicInputs');
        dynamicInputs.innerHTML = '';

        if (item === 'cone') {
            createConeForm(dynamicInputs);
        } else if (item === 'cylinder') {
            createCylinderForm(dynamicInputs);
        } else if (item === 'sphere') {
            createSphereForm(dynamicInputs);
        }

        document.getElementById('formContainer').classList.remove('hidden');
    });

    function createConeForm(dynamicInputs) {
        let html = `
        
        <div>
            <label for="heightOrSlant">Height or Slant Height:</label>
            <select id="heightOrSlant" name="heightOrSlant" required>
                <option value="" disabled selected>Select one</option>
                <option value="height">Height</option>
               
            </select>
        </div>
        <div id="heightOrSlantInput" class="hidden">
            <label for="heightOrSlantValue" id="heightOrSlantLabel"></label>
            <input type="text" id="heightOrSlantValue" name="heightOrSlantValue" required>
        </div>
        <div>
            <label for="radius">Radius of Base:</label>
            <input type="text" id="radius" name="radius" required>
        </div>
        <div>
            <label for="axisOrBaseInclination">Axis or Base Inclination:</label>
            <select id="axisOrBaseInclination" name="axisOrBaseInclination" required>
                <option value="" disabled selected>Select one</option>
                
                <option value="base">Base Inclination</option>
            </select>
        </div>
        <div id="axisOrBaseInclinationInputs" class="hidden">
            <label for="inclinationHP">Inclination to HP:</label>
            <input type="text" id="inclinationHP" name="inclinationHP" required>
            <label for="inclinationVP">Inclination to VP:</label>
           
        </div>
        `;
        dynamicInputs.innerHTML = html;

        document.getElementById('heightOrSlant').addEventListener('change', function() {
            const selectedValue = this.value;
            const heightOrSlantInput = document.getElementById('heightOrSlantInput');
            const heightOrSlantLabel = document.getElementById('heightOrSlantLabel');
            if (selectedValue) {
                heightOrSlantLabel.textContent = selectedValue === 'height' ? 'Height:' : 'Slant Height:';
                heightOrSlantInput.classList.remove('hidden');
            } else {
                heightOrSlantInput.classList.add('hidden');
            }
        });

        document.getElementById('axisOrBaseInclination').addEventListener('change', function() {
            const inclinationInputs = document.getElementById('axisOrBaseInclinationInputs');
            if (this.value) {
                inclinationInputs.classList.remove('hidden');
            } else {
                inclinationInputs.classList.add('hidden');
            }
        });
    }

    function createCylinderForm(dynamicInputs) {
        dynamicInputs.innerHTML = `
            <div>
                <label for="height">Height:</label>
                <input type="text" id="height" name="height" required>
            </div>
            <div>
                <label for="radius">Radius:</label>
                <input type="text" id="radius" name="radius" required>
            </div>
        `;
    }

    function createSphereForm(dynamicInputs) {
        dynamicInputs.innerHTML = `
            <div>
                <label for="radius">Radius:</label>
                <input type="text" id="radius" name="radius" required>
            </div>
        `;
    }

    document.getElementById('itemForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Save form data to sessionStorage
        sessionStorage.setItem('formData', JSON.stringify(data));

        // Hide the form and show the 3D and 2D buttons
        document.querySelector('.container').innerHTML = `
            <div id="viewOptions">
                <button id="view3D">3D</button>
                <button id="view2D">2D</button>
            </div>
        `;

        // Attach event listeners to the new buttons
        document.getElementById('view3D').addEventListener('click', function() {
            const params = new URLSearchParams(data).toString();
            window.open('3d.html?' + params, '_blank');
        });

        document.getElementById('view2D').addEventListener('click', function() {
            const params = new URLSearchParams(data).toString();
            window.open('2d.html?' + params, '_blank');
        });
    });
});
