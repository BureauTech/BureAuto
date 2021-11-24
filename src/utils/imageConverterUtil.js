export default {
    arrayBufferToString: function(bufferArray) {
        if(!bufferArray) {
            return "https://raw.githubusercontent.com/BureauTech/BureAuto/master/doc/img/bureauto_sem_fundo.png"
        }
        
        const buffer = bufferArray[0].data
        const bufView = new Uint16Array(buffer)
        const length = bufView.length
        let result = ""
        let addition = Math.pow(2, 16) - 1

        for (let i = 0; i < length; i += addition) {
            if (i + addition > length) {
                addition = length - i
            }
            result += String.fromCharCode.apply(null, bufView.subarray(i, i + addition))
        }
        return result
        
    },

    loadImageFileAsURL: function(fileToLoad) {
        const fileReader = new FileReader()
        const temp = []

        fileReader.onload = function(fileLoadedEvent) {
            temp.push(fileLoadedEvent.target.result)
            document.getElementById("image").src=`${fileLoadedEvent.target.result}`
        }
        fileReader.readAsDataURL(fileToLoad)

        return temp
    }
}
