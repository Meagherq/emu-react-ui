import { WasmBoy } from 'wasmboy';

function configure() {
  const canvasElement = document.querySelector("canvas");

  const WasmBoyOptions = {
    headless: false,
    useGbcWhenOptional: true,
    isAudioEnabled: true,
    frameSkip: 1,
    audioBatchProcessing: true,
    timersBatchProcessing: false,
    audioAccumulateSamples: true,
    graphicsBatchProcessing: false,
    graphicsDisableScanlineRendering: false,
    tileRendering: true,
    tileCaching: true,
    gameboyFPSCap: 60,
    updateGraphicsCallback: false,
    updateAudioCallback: false,
    saveStateCallback: false
  };

  WasmBoy.config(WasmBoyOptions, canvasElement)
    .then(() => {
      console.log("WasmBoy is configured!");
      // You may now load games, or use other exported functions of the lib.
    })
    .catch(() => {
      console.error("Error Configuring WasmBoy...");
    });
}

function loadROM(event) {
  WasmBoy.loadROM(event.target.files[0])
    .then(() => {
      console.log("WasmBoy ROM loaded!");
    })
    .catch((err) => {
      console.error(err.toString());
      console.error("Error loading the ROM");
    });
}

async function loadROMFromUrl(event) {
    let isLoaded = false
    await WasmBoy.loadROM(event)
      .then(() => {
        console.log("WasmBoy ROM loaded!");
        isLoaded = true
      })
      .catch(() => { 
        console.error("Error loading the ROM");
        isLoaded = false;
      });
      
      return isLoaded
  }
  

function play() {
  WasmBoy.play()
    .then(() => {
      console.log("WasmBoy is playing!");
    })
    .catch(() => {
      console.error("WasmBoy had an error playing...");
    });
}

function pause() {
  WasmBoy.pause()
    .then(() => {
      console.log("WasmBoy is paused!");
    })
    .catch(() => {
      console.error("WasmBoy had an error pausing...");
    });
}

function reset() {
  WasmBoy.reset()
    .then(() => {
      console.log("WasmBoy is reset!");
    })
    .catch(() => {
      console.error("WasmBoy had an error reseting...");
    });
}

function save() {
  WasmBoy.saveState()
    .then(() => {
      console.log("WasmBoy saved the state!");
      // Call .play() here to continue playing the ROM.
    })
    .catch(() => {
      console.error("WasmBoy had an error saving the state...");
    });
}

function getSaves() {
  let saveStates = [];
  WasmBoy.getSaveStates()
    .then(arrayOfSaveStateObjects => {
      console.log(
        "Got WasmBoy Save States for the loaded ROM: ",
        arrayOfSaveStateObjects
      );
      saveStates = arrayOfSaveStateObjects;
    })
    .catch(() => {
      console.error("Error getting the save states for the loaded ROM");
    });
  return saveStates;
}

function loadState(saveStateFromArrayOfSaveStates) {
  WasmBoy.loadState(saveStateFromArrayOfSaveStates)
    .then(() => {
      console.log("WasmBoy loaded the state!");
      // Call .play() here to continue playing the ROM.
    })
    .catch(() => {
      console.error("WasmBoy had an error loading the state...");
    });
}

const gameboy = {
  configure: () => configure(),
  loadROM: (rom) => loadROM(rom),
  loadROMFromUrl: (rom) => loadROMFromUrl(rom),
  play: () => play(),
  pause: () => pause(),
  reset: () => reset(),
  save: () => save(),
  getSaves: () => getSaves(),
  loadState: saveState => loadState(saveState)
};

export default gameboy;
