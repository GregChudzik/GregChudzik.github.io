function getClicked() {
  return event.target
};

function toggleDisplay(id) {
  var menu = document.getElementById(id).nextElementSibling;
  if (menu.style.display === "grid") {
    document.getElementById(id).classList.remove("collapsible-active");
    setTimeout(() => {menu.style.display = "none"}, 240)
    menu.animate([
    {opacity: 1},
    {opacity: 0}
    ], {
    duration: 250
    });
  } else {
    menu.style.display = "grid";
    document.getElementById(id).classList.add("collapsible-active");
    menu.animate([
      {opacity: 0},
      {opacity: 1}
    ], {
    duration: 250
    })
  }
  for (let i = 0; i < 5; i++) {
    if (document.getElementsByClassName("menu")[i].style.display === "grid" && document.getElementsByClassName("menu")[i] !== menu) {
      document.getElementsByClassName("menu")[i].style.display = "none"
      document.getElementsByClassName("collapsible")[i].classList.remove("collapsible-active")
    }
  }
}

/* function blurDisplay(id) {
  
  var menu = document.getElementById(id).nextElementSibling;
  if (event.target.className !== "layerLabel" || event.target.className !== "fa" || event.target.className !== "matrix-cell") {
    document.getElementById(id).classList.remove("collapsible-active");
    setTimeout(() => {menu.style.display = "none"}, 240)
    menu.animate([
    {opacity: 1},
    {opacity: 0}
    ], {
    duration: 250
    });
  }
} */

let rgbVals = {
  rMin: [159, 203, 0, 255],
  rMax: [255, 152, 0, 255],
  gMin: [218, 153, 62, 155],
  gMax: [195, 164, 255, 243],
  bMin: [255, 126, 112, 3],
  bMax: [158, 156, 255, 109],
}

let rgbDelta = {
  r: [rgbVals.rMax[0] - rgbVals.rMin[0], rgbVals.rMax[1] - rgbVals.rMin[1], rgbVals.rMax[2] - rgbVals.rMin[2], rgbVals.rMax[3] - rgbVals.rMin[3]],
  g: [rgbVals.gMax[0] - rgbVals.gMin[0], rgbVals.gMax[1] - rgbVals.gMin[1], rgbVals.gMax[2] - rgbVals.gMin[2], rgbVals.gMax[3] - rgbVals.gMin[3]],
  b: [rgbVals.bMax[0] - rgbVals.bMin[0], rgbVals.bMax[1] - rgbVals.bMin[1], rgbVals.bMax[2] - rgbVals.bMin[2], rgbVals.bMax[3] - rgbVals.bMin[3]],
}

let toneArr = [[], [], [], []];
let freqRange = ["", "", "", ""]
let layerNum = 0

let values = {
  speed: [3000, 100, 300, 100],
  chance: [75, 3, 10, 5],
  numVoices: [1, 2, 1, 2],
  oscType: ["sine", "sine", "pwm", "square"],
  oscPrefix: ["fm", "fat", "fat", "fm"],
  pulseWidth: [0, .25, .75, .99],
  PWMModFreq: [0, .25, .5, 1],
  modWave: ["sine", "sine", "triangle", "sine"],
  harmonicity: [2, .5, 1.5, .5],
  modIndex: [1, 2, 3, 4],
  chorusDepth: [2, 5, 25, 100],
  voices: [1, 1, 1, 3],
  filType: ["allpass", "allpass", "lowpass", "bandpass"],
  filFreq: [1000, 1000, 415.30, 1414.21],
  filQ: [0, 1, 2.39, .89],
  filGain: [0, 5, 3, 0],
  filFollow: [0, 3.4, 2, 1],
  volume: [-12, -12, -20, -20],
  attack: [3000, 0, 2000, 0],
  decay: [3000, 2000, 2000, 500],
  sustain: [.1, .25, .1, .2],
  release: [1000, 500, 100, 2000],
  baseHz: [50, 200, 1600, 1600],
  octRange: [4, 3, 3, 4],
  numRows: [8, 6, 12, 16],
  numCols: [8, 6, 12, 16],
  rowType: ["overtone", "overtone", "undertone", "undertone"],
  colType: ["overtone", "overtone", "undertone", "undertone"],
  rowRatLeft: [3, 4, 3, 4],
  rowRatRight: [2, 3, 2, 3],
  colRatLeft: [4, 3, 4, 3],
  colRatRight: [3, 2, 3, 2]
}

function oscMenuDisplay() {
  if (document.getElementById("oscType").value === "pwm" || document.getElementById("oscType").value === "pulse") {
  document.getElementById("oscPrefix").value = "";
  values.oscPrefix[layerNum] = "";
  document.getElementById("oscPrefixDiv").style.display = "none";
  document.getElementById("oscMod").style.display = "none";
  document.getElementById("oscChorus").style.display = "none";
  } else {document.getElementById("oscPrefixDiv").style.display = "initial"}
  if (document.getElementById("oscType").value === "pwm") {
    document.getElementById("oscPulse").style.display = "initial";
  } else {document.getElementById("oscPulse").style.display = "none";};
  if (document.getElementById("oscPrefix").value === "fm" || document.getElementById("oscPrefix").value === "am") {
    document.getElementById("oscMod").style.display = "initial";
  } else {document.getElementById("oscMod").style.display = "none";};
  if (document.getElementById("oscPrefix").value === "fm") {
    document.getElementById("modIndexDiv").style.display = "initial"
  } else {document.getElementById("modIndexDiv").style.display = "none"};
  if (document.getElementById("oscPrefix").value === "fat") {
    document.getElementById("oscChorus").style.display = "initial"
  } else {document.getElementById("oscChorus").style.display = "none";}
}

function getLayer(value) {
  layerNum = value;
  for (const p in values) {
    document.getElementById(p).value = values[p][layerNum]
  };
  let collapsibleArr = document.getElementsByClassName("collapsible")
  for (let i = 0; i < collapsibleArr.length; i++) {
    let colorInc = i / (collapsibleArr.length - 1);
    collapsibleArr[i].style.backgroundColor = "rgb("+(rgbVals.rMin[layerNum] + (rgbDelta.r[layerNum] * colorInc))+","+(rgbVals.gMin[layerNum] + (rgbDelta.g[layerNum] * colorInc))+","+(rgbVals.bMin[layerNum] + (rgbDelta.b[layerNum] * colorInc))+")"
  };
  let titleArr = document.getElementById("title").getElementsByTagName("span")
  for (i = 0; i < titleArr.length; i++) {
    let colorInc = i / (titleArr.length - 1);
    titleArr[i].style.color = "rgb("+(rgbVals.rMin[layerNum] + (rgbDelta.r[layerNum] * colorInc))+","+(rgbVals.gMin[layerNum] + (rgbDelta.g[layerNum] * colorInc))+","+(rgbVals.bMin[layerNum] + (rgbDelta.b[layerNum] * colorInc))+")"
  };
 
  document.getElementById("ADSRGradStop1").setAttribute("style", "stop-color:rgb("+rgbVals.rMin[layerNum]+","+rgbVals.gMin[layerNum]+","+rgbVals.bMin[layerNum]+");stop-opacity:1");
  document.getElementById("ADSRGradStop2").setAttribute("style", "stop-color:rgb("+rgbVals.rMax[layerNum]+","+rgbVals.gMax[layerNum]+","+rgbVals.bMax[layerNum]+");stop-opacity:1");
  document.getElementById("FilterGradStop1").setAttribute("style", "stop-color:rgb("+rgbVals.rMin[layerNum]+","+rgbVals.gMin[layerNum]+","+rgbVals.bMin[layerNum]+");stop-opacity:1");
  document.getElementById("FilterGradStop2").setAttribute("style", "stop-color:rgb("+rgbVals.rMax[layerNum]+","+rgbVals.gMax[layerNum]+","+rgbVals.bMax[layerNum]+");stop-opacity:1");
  oscMenuDisplay();
}

getLayer(0);

function getLayerChange(target) {
  let targetArr = values[target];
  targetArr[layerNum] = document.getElementById(target).value;
  if (target === "numRows" || target === "numCols") {
    gridTransition()
  } else {
    makeCells(layerNum)
  }
}

$(function() {

async function Envelope() {

  let ampEnvGUI = new Tone.AmplitudeEnvelope ({
    attack: +values.attack[layerNum] / 1000,
    decay: +values.decay[layerNum] / 1000,
    attackCurve: "linear",
    decayCurve: "linear",
    releaseCurve: "linear",
    sustain: +values.sustain[layerNum],
    release: +values.release[layerNum] / 1000,
  });

  let envVals = Array.from(await ampEnvGUI.asArray(100));
  for (let i = 0; i < envVals.length; i++) {
    envVals[i] = "L " + i + " " + ((1 - (envVals[i] * .9)) * 100);
  };
  
  $("#ADSRLine").attr("d", "M 0 100 " + envVals.join(" ") + "L 100 100");

  let noteLength = +values.attack[layerNum] + +values.decay[layerNum] + +values.release[layerNum]
  document.getElementById("ADSRMarker").innerHTML = ""
  for (i = 0; i < noteLength; i++) {
    if (noteLength >= 0 && noteLength < 400) {
      if (i % 100 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = i + "ms"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
      }
    } else if (noteLength >=400 && noteLength < 800) {
      if (i % 200 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = i + "ms"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
      }
    } else if (noteLength >=800 && noteLength < 2000) {
      if (i % 500 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = i + "ms"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
      }
    } else if (noteLength >= 2000 && noteLength < 6000) {
      if (i % 1000 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = (i / 1000) + "s"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
        }
    } else if (noteLength >= 6000 && noteLength < 20000) {
      if (i % 5000 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = (i / 1000) + "s"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
        }
    } else {
      if (i % 10000 == 0) {
        let ADSRMarkerDiv = document.createElement("div");
        document.getElementById("ADSRMarker").appendChild(ADSRMarkerDiv);
        ADSRMarkerDiv.setAttribute("class", "ADSRMarkerDiv");
        ADSRMarkerDiv.innerHTML = (i / 1000) + "s"
        ADSRMarkerDiv.style.left = ((i / noteLength) * 100) + "%"
      }
    }
  }
  ampEnvGUI.dispose();
}

Envelope();

document.getElementById("attack").onmousedown = (e) => {
  let YList = [0, e.pageY];
  document.onmousemove = (e) => {
    YList[0] = e.pageY;
    if (YList[0] > YList[1]) {
        values.attack[layerNum] = Math.floor(values.attack[layerNum] / 100) * 100;
        values.attack[layerNum] = +values.attack[layerNum] - 100
      } else if (YList[0] < YList[1]) {
        values.attack[layerNum] = Math.ceil(values.attack[layerNum] / 100) * 100;
        values.attack[layerNum] = +values.attack[layerNum] + 100
    };
    if (values.attack[layerNum] < 0) {
      values.attack[layerNum] = 0
    };
    $("#attack").val(values.attack[layerNum])
    YList[1] = e.pageY;
    Envelope()
  }
}

document.getElementById("decay").onmousedown = (e) => {
  let YList = [0, e.pageY];
  document.onmousemove = (e) => {
    YList[0] = e.pageY;  
    if (YList[0] > YList[1]) {
      values.decay[layerNum] = Math.floor(values.decay[layerNum] / 100) * 100;
      values.decay[layerNum] = +values.decay[layerNum] - 100
    } else if (YList[0] < YList[1]) {
      values.decay[layerNum] = Math.ceil(values.decay[layerNum] / 100) * 100;
      values.decay[layerNum] = +values.decay[layerNum] + 100
    };
    if (values.decay[layerNum] < 1) {
      values.decay[layerNum] = 1
    }; 
    $("#decay").val(values.decay[layerNum]);
    YList[1] = e.pageY;
    Envelope();
  }
}

document.getElementById("sustain").onmousedown = (e) => {
  let YList = [0, e.pageY];
  document.onmousemove = (e) => {
    YList[0] = e.pageY; 
    if (YList[0] > YList[1]) {
      values.sustain[layerNum] = Math.floor(values.sustain[layerNum] / .05) * .05;
      values.sustain[layerNum] = +values.sustain[layerNum] - .05
    } else if (YList[0] < YList[1]) {
      values.sustain[layerNum] = Math.ceil(values.sustain[layerNum] / .05) * .05;
      values.sustain[layerNum] = +values.sustain[layerNum] + .05
    };
    if (values.sustain[layerNum] < 0) {
      values.sustain[layerNum] = 0
    } else if (values.sustain[layerNum] > 1) {
      values.sustain[layerNum] = 1
    };
    $("#sustain").val(values.sustain[layerNum])
    YList[1] = e.pageY;
    Envelope ()      
  }
}

document.getElementById("release").onmousedown = (e) => {
  let YList = [0, e.pageY];
  document.onmousemove = (e) => {
    YList[0] = e.pageY;  
    if (YList[0] > YList[1]) {
      values.release[layerNum] = Math.floor(values.release[layerNum] / 100) * 100;
      values.release[layerNum] = +values.release[layerNum] - 100
    } else if (YList[0] < YList[1]) {
      values.release[layerNum] = Math.ceil(values.release[layerNum] / 100) * 100;
      values.release[layerNum] = +values.release[layerNum] + 100
    };
    if (values.release[layerNum] < 0) {
      values.release[layerNum] = 0
    }; 
    $("#release").val(values.release[layerNum]);
    YList[1] = e.pageY;
    Envelope();
  }
}


/* document.onmouseup = () => {
  document.onmousemove = () => {}
} */

$("#attack, #decay, #sustain, #release, #layer1focus, #layer2focus, #layer3focus, #layer4focus").on("change", () => {Envelope()});

function updateFilter() {
  var filter = new Tone.Filter({  
    type: values.filType[layerNum],
    frequency: values.filFreq[layerNum],
    Q: values.filQ[layerNum],
    gain: values.filGain[layerNum],
})

filterVals = Array.from(filter.getFrequencyResponse())
for (let i = 0; i < filterVals.length; i++) {
  filterVals[i] = "L " + i + " " + (64 - (filterVals[i] * 32));
}
$("#filterLine").attr("d", "M 0 64" + filterVals.join(" ") + "L 127 64")
filter.dispose();
}

updateFilter();

document.getElementById("filterContainer").onmousedown = (e) => {
  let XList = [0, e.pageX];
  let YList = [0, e.pageY];
  document.onmousemove = (e) => {
    XList[0] = e.pageX;
    if (values.filFreq[layerNum] <= 20000 && values.filFreq[layerNum] >= 20) {
      if (XList[0] > XList[1]) {
        values.filFreq[layerNum] = values.filFreq[layerNum] * Math.pow(2, 1 / 12)
      } else if (XList[0] < XList[1]) {
        values.filFreq[layerNum] = values.filFreq[layerNum] / Math.pow(2, 1 / 12)
      } 
    } else if (values.filFreq[layerNum] >= 20000) {
      values.filFreq[layerNum] = 20000
    } else {values.filFreq[layerNum] = 20}
    $("#filFreq").val(values.filFreq[layerNum])
    XList[1] = e.pageX;

    YList[0] = e.pageY;
    if (values.filQ[layerNum] >= 0 && values.filQ[layerNum] <= 6) {
      if (YList[0] > YList[1]) {
        values.filQ[layerNum] = values.filQ[layerNum] - .1
      } else if (YList[0] < YList[1]) {
        values.filQ[layerNum] = values.filQ[layerNum] + .1 
      }
    } else if (values.filQ[layerNum] > 6) {
      values.filQ[layerNum] = 6
    } else {values.filQ[layerNum] = 0}
    $("#filQ").val(values.filQ[layerNum])
    YList[1] = e.pageY;
    updateFilter();
  }
}

document.onmouseup = () => {
  document.onmousemove = () => {}
}

$("#filType, #filFreq, #filQ, #filGain, #layer1focus, #layer2focus, #layer3focus, #layer4focus").on("change", () => {
  updateFilter();
})

})

function makeCells(layer) {
  toneArr[layer].length = 0;
  let colBaseHz = values.baseHz[layer];
  for (let i = 1; i <= values.numRows[layer]; i++) {
    if (values.colType[layer] == "overtone") {
      document.getElementById("colRat").style.display = "none"
      colBaseHz = values.baseHz[layer] * i
    } else if (values.colType[layer] == "undertone") {
      document.getElementById("colRat").style.display = "none"
      colBaseHz = values.baseHz[layer] / i
    } else if (values.colType[layer] == "ratio") {
      document.getElementById("colRat").style.display = "block"
      colBaseHz = values.baseHz[layer] * (Math.pow(values.colRatLeft[layer], (i - 1)) / Math.pow(values.colRatRight[layer], (i - 1)))
    } else {
      document.getElementById("colRat").style.display = "none"
      colBaseHz = values.baseHz[layer] * Math.pow(2, ((i - 1) / 12));
    };

    for (let j = 1; j <= values.numCols[layer]; j++) {
      if (values.rowType[layer] == "overtone") {
        document.getElementById("rowRat").style.display = "none"
        toneArr[layer].push(colBaseHz * j)
      } else if (values.rowType[layer] == "undertone") {
        document.getElementById("rowRat").style.display = "none"
        toneArr[layer].push(colBaseHz / j)
      } else if (values.rowType[layer] == "ratio") {
        document.getElementById("rowRat").style.display = "block"
        toneArr[layer].push(colBaseHz * (Math.pow(values.rowRatLeft[layer], (j - 1)) / Math.pow(values.rowRatRight[layer], (j - 1))))
      } else {
        document.getElementById("rowRat").style.display = "none"
        toneArr[layer].push(colBaseHz * Math.pow(2, ((j - 1) / 12)));
      };
    }
  };

  let freqMax = values.baseHz[layerNum] * Math.pow(2, +values.octRange[layer])
  let freqMin = values.baseHz[layerNum] * Math.pow(2, (+values.octRange[layer] * -1))

  for (let i = 0; i < toneArr[layer].length; i++) {
    if (toneArr[layer][i] > freqMax) {
      while (toneArr[layer][i] > freqMax) {
        toneArr[layer][i] *= Math.pow(2, (+values.octRange[layer] * -1));
      }
    } else if (toneArr[layer][i] < freqMin) {
      while (toneArr[layer][i] < freqMin) {
        toneArr[layer][i] *= Math.pow(2, +values.octRange[layer]);
      }
    } else {toneArr[layer][i] = toneArr[layer][i]}
  }

  freqRange[layer] = Math.max(...toneArr[layer]) - Math.min(...toneArr[layer]);
  
  document.getElementById('matrix-UI').innerHTML = ''
  document.getElementById('matrix-UI').style.height = (70 * (Math.min(values.numRows[layer], values.numCols[layer]) / values.numCols[layer])) +"vh";
  document.getElementById('matrix-UI').style.width = (70 * (Math.min(values.numRows[layer], values.numCols[layer]) / values.numRows[layer])) +"vh";
  document.getElementById('matrix-UI').style.gridTemplateColumns = "repeat("+values.numCols[layer]+", 1fr)";
  document.getElementById('matrix-UI').style.gridTemplateRows = "repeat("+values.numRows[layer]+", 1fr)";  

  for (let i = 1; i <= toneArr[layer].length; i++) {
    let div = document.createElement("div");
    document.getElementById("matrix-UI").appendChild(div)
    div.setAttribute("id", i)
    div.setAttribute("class", "matrix-cell")
    div.setAttribute("onclick", "clickPlay(this.id, layerNum)")
  }
  return toneArr[layer]
}

for (let i = 0; i < toneArr.length; i++) {
  toneArr[i] = makeCells(i)
}

makeCells(layerNum)

function gridTransition () {
  setTimeout(() => {makeCells(layerNum)}, 350);
  document.getElementById("block3").animate([
    {opacity: 1},
    {opacity: 0},
    {opacity: 1}
  ], {
    duration: 700
  })
}

let ampEnvArray = [];
let ampEnvs = [{}, {}, {}, {}]

function clickPlay(cell, layer) {
  Tone.start();

  let noteLength = values.attack[layer] + values.decay[layer] + values.release[layer];

  var osc = new Tone.OmniOscillator({
    frequency: toneArr[layer][cell - 1],
    type: values.oscPrefix[layer] + values.oscType[layer],
    volume: values.volume[layer],
    modulationType: values.modWave[layer],
    harmonicity: values.harmonicity[layer],
    modulationIndex: values.modIndex[layer],
    spread: values.chorusDepth[layer],
    count: values.voices[layer],
    modulationFrequency: values.PWMModFreq[layer],
    width: values.pulseWidth[layer],  
  });
  
  var filter = new Tone.Filter({  
    type: values.filType[layer],
    frequency: values.filFreq[layer],
    Q: values.filQ[layer],
    gain: values.filGain[layer],
  })

  let ampEnv = new Tone.AmplitudeEnvelope ({
    attack: +values.attack[layer] / 1000,
    decay: +values.decay[layer] / 1000,
    attackCurve: "linear",
    decayCurve: "linear",
    releaseCurve: "linear",
    sustain: +values.sustain[layer],
    release: +values.release[layer] / 1000,
  }).toDestination();

  var freqEnv = new Tone.FrequencyEnvelope({
    attack: ampEnv.attack,
    attackCurve: ampEnv.attackCurve,
    decay: ampEnv.decay,
    decayCurve: ampEnv.decayCurve,
    sustain: values.sustain[layer],
    release: ampEnv.release,
    releaseCurve: ampEnv.releaseCurve,
    baseFrequency: values.filFreq[layer],
    octaves: values.filFollow[layer],
    exponent: 2,
  }).connect(filter.frequency);
  
  freqEnv.triggerAttackRelease(freqEnv.attack + freqEnv.decay);
  ampEnv.triggerAttackRelease(ampEnv.attack + ampEnv.decay);

  osc.chain(filter, ampEnv).start().stop(+"noteLength");
  let thisCell = document.getElementById(cell);
  let colorPct = (toneArr[layer][+cell - 1] - Math.min(...toneArr[layer])) / freqRange[layer];
  let ampEnvInterval = setInterval(() => {
    if (layer == layerNum) {
      thisCell.style.backgroundColor = "rgba("+(rgbVals.rMin[layer] + (rgbDelta.r[layer] * colorPct))+","+(rgbVals.gMin[layer] + (rgbDelta.g[layer] * colorPct))+","+(rgbVals.bMin[layer] + (rgbDelta.b[layer] * colorPct))+","+ampEnv.value+")"
    };
    ampEnvs[layer][ampEnvInterval] = ampEnv.value;
    let curVal = Math.max(...Object.keys(ampEnvs[layer]))
    if (document.getElementsByClassName("playPause")[layer].className === "fa fa-stop playPause") {
      document.getElementsByClassName("playPause")[layer].style.color = "rgb("+rgbVals.rMax[layer] * ampEnvs[layer][curVal]+","+rgbVals.gMax[layer] * ampEnvs[layer][curVal]+","+rgbVals.bMax[layer] * ampEnvs[layer][curVal]+")"
    } else {
      document.getElementsByClassName("playPause")[layer].style.color = "black"
    };
  }, 20)

  
  
  for (i = 0; i < ampEnvArray.length; i++) {
    if (ampEnvArray[i].split(" ")[1] == cell) {
      clearInterval(ampEnvArray[i].split(" ")[0])
    }
  }
  ampEnvArray.push(ampEnvInterval+" "+cell)
  
  setTimeout(() => {
    ampEnvArray.splice(ampEnvArray.indexOf(ampEnvInterval+" "+cell), 1)
    delete ampEnvs[layer][ampEnvInterval]
    clearInterval(ampEnvInterval);
    ampEnv.dispose();
    freqEnv.dispose();
    filter.dispose();
    osc.dispose();
    }, 
    noteLength + 50);
}



function randomCell(layer) {
  return (Math.floor((Math.random() * toneArr[layer].length)) + 1)
};

let loop1 = new Tone.Loop( () => {
      for (let i = 1; i <= values.numVoices[0]; i++) {
        if ((Math.floor(Math.random() * 100) + 1) <= values.chance[0]) {
          clickPlay(randomCell(0), 0)
        }
      }
    loop1.interval = values.speed[0] / 1000
  }, values.speed[0] / 1000
)

function playPause1() {
  Tone.start();
  if (document.getElementById("playPause1").className === "fa fa-play playPause") {
    document.getElementById("playPause1").className = "fa fa-stop playPause";
    loop1.start();
    Tone.Transport.start("+0.1");
  } else if (document.getElementById("playPause1").className === "fa fa-stop playPause") {
    document.getElementById("playPause1").className = "fa fa-play playPause";
    loop1.stop();
  }
}

let loop2 = new Tone.Loop( () => {
      for (let i = 1; i <= values.numVoices[1]; i++) {
        if ((Math.floor(Math.random() * 100) + 1) <= values.chance[1]) {
          clickPlay(randomCell(1), 1)
        }
      }
      loop2.interval = values.speed[1] / 1000
    }, values.speed[1] / 1000
  )

function playPause2() {
  Tone.start();
  if (document.getElementById("playPause2").className === "fa fa-play playPause") {
    document.getElementById("playPause2").className = "fa fa-stop playPause";
    loop2.start();
    Tone.Transport.start("+0.1");
  } else if (document.getElementById("playPause2").className === "fa fa-stop playPause") {
    document.getElementById("playPause2").className = "fa fa-play playPause";
    loop2.stop();
  }
}

let loop3 = new Tone.Loop( () => {
      for (let i = 1; i <= values.numVoices[2]; i++) {
        if ((Math.floor(Math.random() * 100) + 1) <= values.chance[2]) {
          clickPlay(randomCell(2), 2)
        }
      }
      loop3.interval = values.speed[2] / 1000
    }, (values.speed[2] / 1000)
  )

function playPause3() {
  Tone.start();
  if (document.getElementById("playPause3").className === "fa fa-play playPause") {
    document.getElementById("playPause3").className = "fa fa-stop playPause";
    loop3.start();
    Tone.Transport.start("+0.1");
  } else if (document.getElementById("playPause3").className === "fa fa-stop playPause") {
    document.getElementById("playPause3").className = "fa fa-play playPause";
    loop3.stop();
  }
}

let loop4 = new Tone.Loop( () => {
      for (let i = 1; i <= values.numVoices[3]; i++) {
        if ((Math.floor(Math.random() * 100) + 1) <= values.chance[3]) {
          clickPlay(randomCell(3), 3)
        }
      }
      loop4.interval = values.speed[3] / 1000
    }, (values.speed[3] / 1000)
  )

function playPause4() {
  Tone.start();
  if (document.getElementById("playPause4").className === "fa fa-play playPause") {
    document.getElementById("playPause4").className = "fa fa-stop playPause";
    loop4.start();
    Tone.Transport.start("+0.1");
  } else if (document.getElementById("playPause4").className === "fa fa-stop playPause") {
    document.getElementById("playPause4").className = "fa fa-play playPause";
    loop4.stop();
  }
}
 