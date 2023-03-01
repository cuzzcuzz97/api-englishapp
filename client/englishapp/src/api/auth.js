import axios from 'axios'
axios.defaults.withCredentials = true



export async function onRegistration(registrationData) {
    return await axios.post('http://localhost:5000/register',
    registrationData)
}

export async function onLogin(loginData) {
    return await axios.post('http://localhost:5000/login', loginData)
}

export async function onLogout() {
    return await axios.get('http://localhost:5000/logout')
}

export async function fetchProtectedInfo() {
    return await axios.get('http://localhost:5000/protected')
}

export async function fetchUserInfo() {
    return await axios.get('http://localhost:5000/get-user')
}

export async function addNewListVocab(listData) {
    return await axios.post('http://localhost:5000/app', listData)
}

export async function addNewVocab(vocabData) {
    return await axios.post('http://localhost:5000/app/addvocab', vocabData)
}

export async function deleteListVocab(listId) {
    return await axios.delete(`http://localhost:5000/app/delete/${listId}`)
}

export async function deleteVocab(vocabId) {
    return await axios.delete(`http://localhost:5000/app/vocab/delete/${vocabId}`)
}