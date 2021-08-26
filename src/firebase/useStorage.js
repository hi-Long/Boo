import { useState } from "react"
import firebase from "./firebase"

const useStorage = () => {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState()

    const upload = async (files, applyData) => {
        try {
            setUploading(false)
            const requests = files.map(file => {
                return firebase.storage().ref().child(file.file.name).put(file.file)
            })
            const responses = await Promise.all(requests)
            const urlRequests = responses.map(response => {
                return response.ref.getDownloadURL()
            })
            const downloadURLs = await Promise.all(urlRequests)
            applyData(downloadURLs.map(url => { return { url: url } }))
            setUploading(true)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }
    return {
        uploading, error, upload
    }
}

export default useStorage
