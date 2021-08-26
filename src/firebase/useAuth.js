import { useState } from "react"
import { useDispatch } from "react-redux"
import { SERVER_ROUTE_USERS } from "../constants"
import { userDataStructure } from "../dataStructure"
import useHttp from "../hooks/useHttp"
import { createUser, fetchUser } from "../store/auth-actions"
import { authActions } from "../store/auth-slice"
import firebase from "./firebase"

export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const emailProvider = new firebase.auth.EmailAuthProvider()

const useAuth = () => {
    const dispatch = useDispatch()
    const { makeRequest } = useHttp()
    const [user] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const signUpWithEmailAndPassword = async (authInfo) => {
        try {
            const { name, phone, email, password } = authInfo
            // Create new user with firebase server
            setLoading(true)

            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const userId = response.user.uid
            // User creation success, create new user to database
            const newUser = {
                ...authInfo,
                id: userId,
                name: name,
                phone: phone,
                email: email
            }
            dispatch(createUser(newUser))

            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
            console.log(err.message)
        }
    }

    const signInWithEmailAndPassword = async (authInfo) => {
        try {
            // Authenticate info with firebase server
            const { email, password } = authInfo
            setLoading(true)
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            const userId = response.user.uid

            // Authentication success, retrieve user info from database
            dispatch(fetchUser(userId))

            setLoading(false)
        } catch (err) {
            // Authentication failed
            setError(err.message)
            setLoading(false)
        }
    }

    const signInWithSocialMedia = async (provider) => {
        try {
            // Authenticate with firebase server
            const firebaseResponse = await firebase.auth().signInWithPopup(provider)

            const name = firebaseResponse.user.displayName
            const phone = firebaseResponse.user.phoneNumber
            const email = firebaseResponse.user.email
            const userId = firebaseResponse.user.uid

            // Authentication success, retrieve user info from database
            const requestConfig = {
                url: `${SERVER_ROUTE_USERS}?id=${userId}`,
                method: 'get'
            }
            let serverResponse
            const applyData = (data) => {
                serverResponse = data
            }
            await makeRequest(requestConfig, applyData)
            // If an user found in the db, set store states
            if (serverResponse.length) {
                dispatch(fetchUser(userId))
            }
            // If no user found in the db, create a new one
            else {
                const newUser = {
                    ...userDataStructure,
                    role: "user",
                    id: userId,
                    name, phone, email,
                }
                dispatch(createUser(newUser))
                dispatch(authActions.setUserInfo(newUser))
            }
        } catch (err) {
            setError(err)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            dispatch(authActions.logout())
            setLoading(false)
        } catch (err) {
            setError(err.message)
        }
    }

    return { loading, user, error, signUpWithEmailAndPassword, signInWithEmailAndPassword, signInWithSocialMedia, logout }
}

export default useAuth