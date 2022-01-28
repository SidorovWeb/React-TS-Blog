import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { IPostListProps, postAction, postStatusProps, postType } from '../../types/postsTypes'

export const postCreate = (post: IPostListProps, postID: (id: string) => void) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST__CREATE_START })
  addDoc(collection(db, 'posts'), post)
    .then((newDate) => {
      dispatch({ type: postType.POST_CREATE_SUCCESS })
      postID(newDate.id)
    })
    .catch((error) => {
      dispatch({ type: postType.POST__CREATE_ERROR, payload: error.message })
    })
}

export const postsRead = () => (dispatch: Dispatch<postAction>) => {
  onSnapshot(
    collection(db, 'posts'),
    (snapshot) => {
      dispatch({ type: postType.POSTS_READ_START })
      const newPosts: any = []

      snapshot.docs.map((doc) => newPosts.push({ ...doc.data(), id: doc.id }))
      dispatch({ type: postType.POSTS_READ_SUCCESS, payload: newPosts })
    },
    (error) => {
      dispatch({ type: postType.POSTS_READ_ERROR, payload: error.message })
    }
  )
}

export const postUpdate = (post: IPostListProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_UPDATE_START })

  updateDoc(doc(db, 'posts', post.id), {
    ...post,
  })
    .then(() => {
      dispatch({ type: postType.POST_UPDATE_SUCCESS })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_UPDATE_ERROR, payload: error.message })
    })
}

export const postDelete = (post: IPostListProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_DELETE_START })

  deleteDoc(doc(db, 'posts', post.id))
    .then(() => {
      dispatch({ type: postType.POST_DELETE_SUCCESS })
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
