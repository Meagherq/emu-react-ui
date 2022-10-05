import AADauth from './azure-AD'
import { AADUser } from '../models/users'

class Auth {
    isLoggedIn() {
        return AADauth.isLoggedIn()
    }

    getToken() {
        return AADauth.getAccessToken()
    }

    logout() {
        AADauth.signOut()
    }

    currentUser(): AADUser {
        const emptyUser = {
            id: '',
            name: '',
            firstName: '',
            lastName: '',
        }
        if (!this.isLoggedIn()) {
            return emptyUser
        }
        const account = AADauth.getAccount()
        if (account) {
            return {
                id: account.idToken.oid || account.accountIdentifier,
                name: account.name || account.idToken.name,
                firstName: account.idToken.given_name || '',
                lastName: account.idToken.family_name || '',
            }
        } else {
            return emptyUser
        }
    }
}

const sharedAuth = new Auth()

export const getAuth = () => {
    return sharedAuth
}

export default Auth