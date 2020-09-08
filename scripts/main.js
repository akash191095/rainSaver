"use strict";
const colors = [
  {
    name: "blue",
    primary: "#4affff",
    secondary: "#abffff",
    hue: "hue-rotate(0deg)",
    checked: true,
  },
  {
    name: "pink",
    primary: "#ed85ff",
    secondary: "#f9d6ff",
    hue: "hue-rotate(125deg)",
  },
  {
    name: "yellow",
    primary: "#ffe87a",
    secondary: "#fff6cc",
    hue: "saturate(2.2) hue-rotate(211deg) brightness(1.5)",
  },
  {
    name: "green",
    primary: "#66ff90",
    secondary: "#ccffda",
    hue: "hue-rotate(265deg)",
  },
  {
    name: "red",
    primary: "#ff5252",
    secondary: "#ffd9d9",
    hue: "hue-rotate(180deg)",
  },
  {
    name: "purple",
    primary: "#a36eff",
    secondary: "#ddc9ff",
    hue: "hue-rotate(87deg)",
  },
  {
    name: "white",
    primary: "#fff",
    secondary: "#f2f2f2",
    hue: "grayscale(1) brightness(1.8)",
  },
  {
    name: "black",
    primary: "#000",
    secondary: "#575757",
    hue: "grayscale(1) brightness(0.3)",
  },
];
const colorContainer = document.querySelector(".colors");
const main = document.querySelector("main");
const mainImage = document.querySelector(".main-image");
const logoUpload = document.querySelector(".logo-upload");

// render the color swatches
colors.forEach((color) => {
  colorContainer.appendChild(getColorSwatch(color));
});

function getColorSwatch(color) {
  // create nodes
  const container = document.createElement("div");
  const input = document.createElement("input");
  const checkmark = document.createElement("span");
  const innerCheckmark = document.createElement("span");

  // set attributes
  container.setAttribute("class", "color-swatch");
  input.setAttribute("type", "radio");
  checkmark.setAttribute("class", "checkmark");

  // style nodes
  checkmark.style.backgroundColor = color.primary;

  // append to create final container
  container.appendChild(input);
  checkmark.appendChild(innerCheckmark);
  container.appendChild(checkmark);

  container.addEventListener("click", () =>
    onColorSelect(input, innerCheckmark, color)
  );

  // initilize default color
  if (color.checked) onColorSelect(input, innerCheckmark, color);

  return container;
}

function onColorSelect(input, innerCheckmark, { primary, secondary, hue }) {
  // mark all as not checked
  const allColorSwatches = document.querySelectorAll(".color-swatch > input");
  allColorSwatches.forEach((node) => {
    node.removeAttribute("checked");
  });

  // selected value
  input.setAttribute("checked", "checked");
  innerCheckmark.style.backgroundColor = secondary;

  // change background color
  main.style.backgroundColor = secondary;
  logoUpload.style.backgroundColor = primary;

  // change product image
  mainImage.style.filter = hue;
}

function attachImageToNode(node, file) {
  const uploadText = document.querySelector(".logo-upload p");
  // only allow files < 5mb
  if (file.size / 1000 / 1000 > 5) {
    uploadText.textContent = "Invalid File";
    return false;
  }
  node.src = URL.createObjectURL(file);
  node.onload = function () {
    URL.revokeObjectURL(node.src); // free memory
  };
  uploadText.textContent = file.name.slice(0, 15);
  return true;
}

function loadLogo(event) {
  // use previously generated output if available
  const previousOutput = document.querySelector(".logo");
  if (previousOutput) {
    attachImageToNode(previousOutput, event.target.files[0]);
  } else {
    // else create new node
    const output = document.createElement("img");
    const status = attachImageToNode(output, event.target.files[0]);
    if (!status) return;
    output.setAttribute("class", "logo");
    output.setAttribute("alt", "logo");
    const imageContainer = document.querySelector(".image-container");
    imageContainer.appendChild(output);
  }
}
