import gameboy from './gameboy'

class GameboyClient {
    configure() {
        return gameboy.configure()
    }

    loadROM(rom:any) {
        return gameboy.loadROM(rom)
    }

    async loadROMFromUrl(rom:any): Promise<boolean> {
        return await gameboy.loadROMFromUrl(rom)
    }

    play() {
        return gameboy.play()
    }

    pause() {
        return gameboy.pause()
    }

    reset() {
        return gameboy.reset()
    }

    save() {
        return gameboy.save()
    }

    getSaves() {
        return gameboy.getSaves()
    }

    loadState(saveState:any) {
        return gameboy.loadState(saveState)
    }
}

const sharedGameboy = new GameboyClient()

export const getGameboy = () => {
    return sharedGameboy
}

export default GameboyClient