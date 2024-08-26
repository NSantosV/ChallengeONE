// Asignación de eventos a los botones
document.getElementById("encryptBtn").addEventListener("click", function() {
    let inputText = document.getElementById("inputText").value;
    
    // Validar que solo se ingresen letras minúsculas y espacios
    if (/^[a-z\s]+$/.test(inputText)) {
        if (inputText) {
            let encryptedText = encriptarTexto(inputText);
            mostrarResultado(encryptedText);
            document.getElementById("copyBtn").style.display = 'block'; // Mostrar el botón Copiar
        } else {
            alert("Por favor, ingresa un texto.");
        }
    } else {
        alert("Solo se aceptan letras minúsculas y espacios.");
    }
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    let inputText = document.getElementById("inputText").value;
    
    // Validar que solo se ingresen letras minúsculas y espacios
    if (/^[a-z\s]+$/.test(inputText)) {
        if (inputText) {
            let decryptedText = desencriptarTexto(inputText);
            mostrarResultado(decryptedText);
            document.getElementById("copyBtn").style.display = 'block'; // Mostrar el botón Copiar
        } else {
            alert("Por favor, ingresa un texto.");
        }
    } else {
        alert("Solo se aceptan letras minúsculas y espacios.");
    }
});

document.getElementById("inputText").addEventListener("input", function() {
    let inputText = document.getElementById("inputText").value;
    
    if (inputText === "") {
        mostrarResultado(""); // Regresar a la vista principal
        document.getElementById("copyBtn").style.display = 'none'; // Ocultar el botón Copiar
    }
});

// Función para encriptar el texto usando el cifrado César
function encriptarTexto(texto) {
    let desplazamiento = 3; // Desplazamiento del cifrado César
    return texto.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26) + 97);
        } else {
            return char; // No encriptar otros caracteres
        }
    }).join('');
}

// Función para desencriptar el texto usando el cifrado César
function desencriptarTexto(texto) {
    let desplazamiento = 3; // Debe coincidir con el usado en la encriptación
    return texto.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((char.charCodeAt(0) - 97 - desplazamiento + 26) % 26) + 97);
        } else {
            return char; // No desencriptar otros caracteres
        }
    }).join('');
}

// Función para mostrar el resultado en el contenedor de salida
    function mostrarResultado(mensaje) {
        const outputContainer = document.getElementById("outputContainer");

        if (mensaje === "") {
            // Restaurar vista principal
            outputContainer.innerHTML = `
                <img src="image.png" alt="No message found" id="placeholderImage">
                <p id="outputMessage">Ningún mensaje fue encontrado</p>
                <p>Ingresa el texto que desees encriptar o desencriptar.</p>
            `;
            document.getElementById("copyBtn").style.display = 'none'; // Ocultar el botón Copiar
        } else {
            // Mostrar mensaje encriptado/desencriptado y botón Copiar
            outputContainer.innerHTML = `
                <p>${mensaje}</p>
            `;
            document.getElementById("copyBtn").style.display = 'block'; // Asegurarse de que el botón Copiar esté visible
            document.getElementById("copyBtn").addEventListener("click", copiarAlPortapapeles); // Volver a asignar el evento de copiar
        }
    }
    // Función para copiar el contenido al portapapeles
    function copiarAlPortapapeles() {
        const outputContainer = document.getElementById("outputContainer");
        const texto = outputContainer.innerText || outputContainer.textContent;

        // Crea un elemento de texto temporal
        const textarea = document.createElement("textarea");
        textarea.value = texto;
        document.body.appendChild(textarea);

        // Selecciona y copia el texto
        textarea.select();
        document.execCommand("copy");

        // Elimina el elemento de texto temporal
        document.body.removeChild(textarea);
    }

    // Conecta el botón "Copiar" con la función copiarAlPortapapeles
    document.getElementById("copyBtn").addEventListener("click", copiarAlPortapapeles);
