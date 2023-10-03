import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersonList = async (callback) => {
  await axios.get(baseUrl)
    .then(response => {
      if (callback) callback(response.data)
  })
}

const addPerson = async (newEntry, callback) => {
  await axios.post(baseUrl, newEntry)
    .then(response => {
      if (callback) callback(response.data)
  })
}

const updatePerson = async (newEntry, callback) => {
    await axios.put(baseUrl +`/${newEntry.id}`, newEntry)
      .then(response => {
        if (callback) callback(response.data)
    })
  }

const deletePerson = async (id, callback) => {
  await axios.delete(baseUrl +`/${id}`)
    .then(response => {
      if (callback) callback(response.data)
    })
}

export default {getPersonList, addPerson, deletePerson, updatePerson}