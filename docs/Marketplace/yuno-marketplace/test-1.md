---
title: Test
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flujo de Preguntas</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f8fa;
    }

    .container {
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
      padding: 20px;
      color: #313131; /* Texto en violeta */
    }

    .question {
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .question.active {
      opacity: 1;
    }

    .question h2 {
      margin: 0 0 20px;
      font-size: 22px;
      color: #313131; /* Título en violeta */
    }

    .options {
      display: flex;
      flex-direction: column;
    }

    .option {
      margin-bottom: 10px;
      padding: 12px 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      color: #555;
      transition: background-color 0.2s ease;
    }

    .option:hover {
      background-color: #f1f1f1;
    }

    .back-btn {
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      color: #888;
      transition: color 0.2s ease;
    }

    .back-btn:hover {
      color: #555;
    }

    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked + label {
      background-color: #313131; /* Fondo violeta para la opción seleccionada */
      color: #fff; /* Texto en blanco para la opción seleccionada */
      border: 1px solid #313131; /* Bordes en violeta para la opción seleccionada */
    }

    input[type="radio"]:checked + label:hover {
      background-color: #313131; /* Mantener el fondo violeta en el hover para la opción seleccionada */
    }

    #question1:checked ~ .question1,
    #question2:checked ~ .question2,
    #question3:checked ~ .question3,
    #question4:checked ~ .question4,
    #question5:checked ~ .question5 {
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <input type="radio" name="question" id="question1" checked>
    <div class="question question1 active">
      <h2>Pregunta 1: ¿Cómo te sientes hoy?</h2>
      <div class="options">
        <input type="radio" name="q1" id="q1a1">
        <label for="q1a1" class="option" onclick="location.href='#question2'">Bien</label>
        <input type="radio" name="q1" id="q1a2">
        <label for="q1a2" class="option" onclick="location.href='#question2'">Regular</label>
        <input type="radio" name="q1" id="q1a3">
        <label for="q1a3" class="option" onclick="location.href='#question2'">Mal</label>
      </div>
    </div>

    <input type="radio" name="question" id="question2">
    <div class="question question2">
      <h2>Pregunta 2: ¿Cuál es tu comida favorita?</h2>
      <div class="options">
        <input type="radio" name="q2" id="q2a1">
        <label for="q2a1" class="option" onclick="location.href='#question3'">Pizza</label>
        <input type="radio" name="q2" id="q2a2">
        <label for="q2a2" class="option" onclick="location.href='#question3'">Sushi</label>
        <input type="radio" name="q2" id="q2a3">
        <label for="q2a3" class="option" onclick="location.href='#question3'">Hamburguesa</label>
      </div>
      <a href="#question1" class="back-btn">Volver a la pregunta 1</a>
    </div>

    <input type="radio" name="question" id="question3">
    <div class="question question3">
      <h2>Pregunta 3: ¿Cuál es tu color favorito?</h2>
      <div class="options">
        <input type="radio" name="q3" id="q3a1">
        <label for="q3a1" class="option" onclick="location.href='#question4'">Azul</label>
        <input type="radio" name="q3" id="q3a2">
        <label for="q3a2" class="option" onclick="location.href='#question4'">Rojo</label>
        <input type="radio" name="q3" id="q3a3">
        <label for="q3a3" class="option" onclick="location.href='#question4'">Verde</label>
      </div>
      <a href="#question2" class="back-btn">Volver a la pregunta 2</a>
    </div>

    <input type="radio" name="question" id="question4">
    <div class="question question4">
      <h2>Pregunta 4: ¿Cuál es tu hobby favorito?</h2>
      <div class="options">
        <input type="radio" name="q4" id="q4a1">
        <label for="q4a1" class="option" onclick="location.href='#question5'">Leer</label>
        <input type="radio" name="q4" id="q4a2">
        <label for="q4a2" class="option" onclick="location.href='#question5'">Hacer deporte</label>
        <input type="radio" name="q4" id="q4a3">
        <label for="q4a3" class="option" onclick="location.href='#question5'">Ver películas</label>
      </div>
      <a href="#question3" class="back-btn">Volver a la pregunta 3</a>
    </div>

    <input type="radio" name="question" id="question5">
    <div class="question question5">
      <h2>Pregunta 5: ¿Cuál es tu estación del año favorita?</h2>
      <div class="options">
        <input type="radio" name="q5" id="q5a1">
        <label for="q5a1" class="option">Primavera</label>
        <input type="radio" name="q5" id="q5a2">
        <label for="q5a2" class="option">Verano</label>
        <input type="radio" name="q5" id="q5a3">
        <label for="q5a3" class="option">Otoño</label>
        <input type="radio" name="q5" id="q5a4">
        <label for="q5a4" class="option">Invierno</label>
      </div>
      <a href="#question4" class="back-btn">Volver a la pregunta 4</a>
    </div>
  </div>
</body>
</html>
`}</HTMLBlock>
