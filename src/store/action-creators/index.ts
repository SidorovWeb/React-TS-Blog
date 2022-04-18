import * as LoginActionCreators from './loginAction'
import * as RegisterActionCreators from './registerAction'
import * as UserActionCreators from './userAction'
import * as MenuActionCreators from './menuAction'
import * as ModalActionCreators from './modalAction'
import * as PostActionCreators from './postAction'
import * as StorageActionCreators from './storageAction'

export default {
  ...UserActionCreators,
  ...LoginActionCreators,
  ...RegisterActionCreators,
  ...MenuActionCreators,
  ...ModalActionCreators,
  ...UserActionCreators,
  ...PostActionCreators,
  ...StorageActionCreators,
}
