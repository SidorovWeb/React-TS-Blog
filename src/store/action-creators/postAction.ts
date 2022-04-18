import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { postListProps, postAction, postStatusProps, postType } from '../../types/postsTypes'

export const postCreate = (post: postListProps) => async (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_CREATE_START })
  return await addDoc(collection(db, 'posts'), post)
    .then((newDate) => {
      dispatch({ type: postType.POST_CREATE_SUCCESS, payload: { ...post, id: newDate.id } })
      return newDate.id
    })
    .catch((error) => {
      dispatch({ type: postType.POST__CREATE_ERROR, payload: error.message })
    })
}

export const postsRead = () => async (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POSTS_READ_START })
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'asc'))
  await getDocs(q)
    .then((querySnapshot) => {
      let posts: any = []
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id })
      })
      dispatch({ type: postType.POSTS_READ_SUCCESS, payload: posts })
    })
    .catch((error) => {
      dispatch({ type: postType.POSTS_READ_ERROR, payload: error.message })
    })
}

export const postUpdate = (post: postListProps) => async (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_UPDATE_START })

  await updateDoc(doc(db, 'posts', post.id), {
    ...post,
  })
    .then(() => {
      dispatch({ type: postType.POST_UPDATE_SUCCESS, payload: post })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_UPDATE_ERROR, payload: error.message })
    })
}

export const postDelete = (post: postListProps) => async (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_DELETE_START })

  await deleteDoc(doc(db, 'posts', post.id))
    .then(() => {
      dispatch({ type: postType.POST_DELETE_SUCCESS, payload: post })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_DELETE_ERROR, payload: error.message })
    })
}

export const postStatus = (status: postStatusProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_STATUS_CHANGE, payload: { ...status } })
  setTimeout(() => {
    dispatch({
      type: postType.POST_STATUS_CHANGE,
      payload: {
        type: '',
        message: '',
      },
    })
  }, 1000)
}
