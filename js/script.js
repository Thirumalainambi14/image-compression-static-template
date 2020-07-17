const filename = document.getElementById("filename"),
  fileElem = document.getElementById("fileElem"),
  fileSelect = document.getElementById("fileSelect"),
  img = document.getElementById("imageHolder"),
  compressBtn = document.getElementById("compressBtn"),
  downloadBtn = document.getElementById("downloadBtn");

let blurred = 0;

fileSelect.addEventListener(
  "click",
  (e) => {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault();
  },
  false
);

fileElem.addEventListener("change", handleFile, false);

function handleFile() {
  downloadBtn.style.display = "none";
  img.style = "filter:blur(0)); opacity: 1";
  if (!this.files.length) {
    filename.placeholder = "No files are selected";
  } else {
    img.src = URL.createObjectURL(this.files[0]);
    img.width = "100%";
    img.height = "100%";
    img.onload = () => {
      URL.revokeObjectURL(this.src);
    };
    filename.value = this.files[0].name;
    filename.setAttribute("disabled", "disabled");
    filename.setAttribute("width", "100");
    filename.style.textOverflow = "ellipsis";
    if (filename.value) {
      compressBtn.style.display = "block";
    }
    blurred = 1;
  }
}

img.addEventListener(
  "click",
  function () {
    if (filename.value && blurred) {
      img.classList.toggle("active");
    }
  },
  false
);

compressBtn.addEventListener(
  "click",
  () => {
    if (filename.value) {
      downloadBtn.style.display = "block";
    } else {
      downloadBtn.style.display = "none";
    }
    img.style = "filter:blur(1px); opacity: 0.5";
    blurred = 0;
  },
  false
);
