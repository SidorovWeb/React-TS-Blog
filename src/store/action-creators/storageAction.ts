import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Dispatch } from 'redux'
import { storageAction, storageType } from '../../types/storageTypes'
import { userAction } from '../../types/userTypes'

export const storage = (file: File, fileLocated: string) => async (dispatch: Dispatch<storageAction | userAction>) => {
  dispatch({ type: storageType.STORAGE_START })
  try {
    const storage = getStorage()
    const fileRef = ref(storage, fileLocated)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)
    dispatch({ type: storageType.STORAGE_SUCCESS })
    return url
  } catch (error) {
    dispatch({ type: storageType.STORAGE_ERROR, payload: 'STORAGE_ERROR' })
  }
}

export const storageDelete = (fileLocated: string) => (dispatch: Dispatch<storageAction>) => {
  dispatch({ type: storageType.STORAGE_DELETE_START })
  const storage = getStorage()
  const desertRef = ref(storage, fileLocated)

  deleteObject(desertRef)
    .then(() => {
      dispatch({ type: storageType.STORAGE_DELETE_SUCCESS })
    })
    .catch((error) => {
      dispatch({ type: storageType.STORAGE_DELETE_ERROR, payload: error })
    })
}
