import { USERS_ROLES } from "../config/roles.config"

export interface user_register {
fullName:'string'
userName:'string'
password:'string'
role?: USERS_ROLES
}

export interface user_login {
    userName:'string'
    password:'string'
}