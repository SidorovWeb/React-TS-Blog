import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { IPostListProps, postAction, postStatusProps, postType } from '../../types/posts'

export const postsRead = () => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  onSnapshot(
    collection(db, 'posts'),
    (snapshot) => {
      const newPosts: any = []

      snapshot.docs.map((doc) => newPosts.push({ ...doc.data(), id: doc.id }))
      dispatch({ type: postType.POST_READ, payload: newPosts })
    },
    (error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    }
  )
}

export const postCreate = (post: IPostListProps, postID: (id: string) => void) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  addDoc(collection(db, 'posts'), post)
    .then((newDate) => {
      dispatch({ type: postType.POST_CREATE })
      updateDoc(doc(db, 'posts', newDate.id), {
        id: newDate.id,
      }).then(() => {
        dispatch({ type: postType.POST_UPDATE })
      })
      postID(newDate.id)
    })
    .catch((error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    })
}

export const postDelete = (post: IPostListProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })

  deleteDoc(doc(db, 'posts', post.id))
    .then(() => {
      dispatch({ type: postType.POST_DELETE })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    })
}

export const postUpdate = (post: IPostListProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })

  updateDoc(doc(db, 'posts', post.id), {
    ...post,
  })
    .then(() => {
      dispatch({ type: postType.POST_UPDATE })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    })
}

export const postStatus = (status: postStatusProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  try {
    dispatch({ type: postType.POST_STATUS, payload: { ...status } })
    setTimeout(() => {
      dispatch({
        type: postType.POST_STATUS,
        payload: {
          type: '',
          message: '',
        },
      })
    }, 1000)
  } catch (error) {
    dispatch({ type: postType.POST_ERROR, payload: 'error' })
  }
}
