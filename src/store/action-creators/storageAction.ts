import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { storageAction, storageType } from '../../types/storageTypes'
import { User, userAction, userType } from '../../types/user'

export const storage =
  (collection: string, user: User, file: File) => async (dispatch: Dispatch<storageAction | userAction>) => {
    const storage = getStorage()
    dispatch({ type: storageType.STORAGE_START })

    const fileRef = ref(storage, `${user.uid}/${user.uid + file.name}`)
    await uploadBytes(fileRef, file).catch((error) => dispatch({ type: storageType.STORAGE_SUCCESS, payload: error }))
    await getDownloadURL(fileRef)
      .then((url) => {
        if (collection === 'users') {
          updateDoc(doc(db, 'users', user.id), {
            ...user,
            userPhoto: url,
          })
            .then(() => {
              localStorage.setItem('currentUser', JSON.stringify({ ...user, userPhoto: url }))
              dispatch({ type: userType.UPDATE_USER, payload: { ...user, userPhoto: url } })
            })
            .catch((error) => {
              dispatch({ type: userType.SET_USER_ERROR, payload: error.message })
            })
        }

        if (collection === 'posts') {
          // dispatch(userUpdate({ ...user, userPhoto: url }))
        }

        dispatch({ type: storageType.STORAGE_SUCCESS, payload: url })
      })
      .catch((error) => dispatch({ type: storageType.STORAGE_SUCCESS, payload: error }))
  }
