const output = document.querySelector(".output");
const buttons = document.querySelectorAll(".btn");

let expression = ""; // cadena interna donde guardamos la operación

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1) Determinar el "valor" real del botón, incluso si usa <i> (RemixIcon)
    let raw = btn.innerText.trim();
    if (!raw) {
      const icon = btn.querySelector("i");
      if (icon) {
        const cls = icon.className;
        if (cls.includes("ri-divide")) raw = "/"; // ÷
        else if (cls.includes("ri-close")) raw = "*"; // ×
        else if (cls.includes("ri-subtract")) raw = "-"; // −
        else if (cls.includes("ri-add")) raw = "+"; // +
        else if (cls.includes("ri-delete-back")) raw = "DEL";
      }
    }

    // CLEAR → C
    if (btn.classList.contains("clear")) {
      expression = "";
      updateDisplay("0");
      return;
    }

    // DELETE → retroceso (la clase 'delete' ya funciona)
    if (btn.classList.contains("delete")) {
      expression = expression.slice(0, -1);
      updateDisplay(expression || "0");
      return;
    }

    // Igual "="
    if (btn.classList.contains("equal")) {
      try {
        const sanitized = cleanExpression(expression);
        // Evaluamos tal cual: % ahora actúa como operador módulo JS
        const result = Function(`return ${sanitized}`)();
        updateDisplay(String(result));
        expression = String(result);
      } catch (error) {
        updateDisplay("Error");
        expression = "";
      }
      return;
    }

    // Si es operador (clase 'operator')
    if (btn.classList.contains("operator")) {
      // raw contiene el símbolo correcto (ej. "+", "-", "*", "/", "%", "( )")
      handleOperator(raw || btn.innerText.trim());
      return;
    }

    // Si es número o punto
    if (btn.classList.contains("number")) {
      // Si raw está vacío, fallback a innerText
      handleNumber(raw || btn.innerText.trim());
      return;
    }
  });
});

// -------------------------
//   Funciones Auxiliares
// -------------------------

function updateDisplay(value) {
  output.textContent = value;
}

function handleNumber(num) {
  if (!num) return;
  // Evitar dos puntos ".."
  if (num === "." && lastChar() === ".") return;

  // Evitar 00 cuando estamos al inicio
  if (num === "0" && expression === "0") return;

  // Reemplazar 0 inicial por número (si no es decimal)
  if (expression === "0" && num !== ".") {
    expression = num;
  } else {
    expression += num;
  }

  updateDisplay(expression);
}

function handleOperator(op) {
  const operators = ["+", "-", "*", "/", "%"];

  // Paréntesis toggle
  if (op === "( )") {
    toggleParenthesis();
    return;
  }

  // Asegurarnos que 'op' sea un símbolo válido
  if (operators.includes(op)) {
    // Evitar dos operadores seguidos (reemplazar último operador)
    if (operators.includes(lastChar())) {
      expression = expression.slice(0, -1) + op;
    } else {
      // No permitir iniciar con * / % (permitir - para negativos si quieres)
      if (expression === "" && (op === "*" || op === "/" || op === "%")) return;
      expression += op;
    }
    updateDisplay(expression);
    return;
  }

  // Si llega cualquier otro texto, lo añadimos (seguro)
  expression += op;
  updateDisplay(expression);
}

function toggleParenthesis() {
  const open = (expression.match(/\(/g) || []).length;
  const close = (expression.match(/\)/g) || []).length;

  if (open === close) {
    expression += "(";
  } else {
    expression += ")";
  }

  updateDisplay(expression);
}

function lastChar() {
  return expression.length ? expression[expression.length - 1] : "";
}

function cleanExpression(expr) {
  // reemplazamos posibles caracteres largos por operadores JS y quitamos espacios
  return expr.replace(/÷/g, "/").replace(/×/g, "*").replace(/\s+/g, "");
}
