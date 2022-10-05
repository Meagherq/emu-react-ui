import iframe from './iframe'

class IframeContainer {
    download(url: any): any {
        return iframe.downloadFile(url)
    }
}

const sharedIFrameContainer = new IframeContainer()

export const getSharedIFrameContainer = () => {
    return sharedIFrameContainer
}

export default IframeContainer