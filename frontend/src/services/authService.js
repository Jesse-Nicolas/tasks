import * as tokenService from './tokenService'
import { addPhoto as addProfilePhoto } from './profileService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER}auth/`

async function signup(user, photo) {
  try {
    const res = await fetch(`${BASE_URL}registration/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const json = await res.json()
    if (json.err) {
      console.log(json.err)
      throw new Error(json.err)
    } else if (json.token) {
      tokenService.setToken(json.token)
      if (photo) {
        const photoData = new FormData()
        photoData.append('photo', photo)
        return await addProfilePhoto(
          photoData,
          tokenService.getUserFromToken().profile
        )
      }
    }
  } catch (err) {
    throw err
  }
}

function getUser() {
  return tokenService.getUserFromToken()
}

function logout() {
  tokenService.removeToken()
}

async function login(credentials) {
  try {
    const res = await fetch(`${BASE_URL}login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const json = await res.json()
    console.log('authService.js login() response:', json)
    if (json.access) {
      tokenService.setToken(json.access)
    }
    if (json.err) {
      throw new Error(json.err)
    }
  } catch (err) {
    throw err
  }
}

async function changePassword(credentials) {
  try {
    const res = await fetch(`${BASE_URL}password/change/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(credentials),
    })
    const json = await res.json()
    if (json.token) {
      tokenService.removeToken()
      tokenService.setToken(json.token)
    }
    if (json.err) {
      console.log(json.er)
      throw new Error(json.err)
    }
  } catch (err) {
    throw err
  }
}

export { signup, getUser, logout, login, changePassword }
