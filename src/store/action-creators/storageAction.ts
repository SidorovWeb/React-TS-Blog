import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Dispatch } from 'redux'
import { storageAction, storageType } from '../../types/storageTypes'
import { User, userAction } from '../../types/userTypes'

export const storage = (file: File, user: User) => async (dispatch: Dispatch<storageAction | userAction>) => {
  dispatch({ type: storageType.STORAGE_START })
  try {
    const storage = getStorage()
    const fileRef = ref(storage, `${user.uid}/${user.uid + file.name}`)
    await uploadBytes(fileRef, file)
    const utl = await getDownloadURL(fileRef)
    dispatch({ type: storageType.STORAGE_SUCCESS })
    return utl
  } catch (error) {
    dispatch({ type: storageType.STORAGE_ERROR, payload: 'STORAGE_ERROR' })
  }
}
