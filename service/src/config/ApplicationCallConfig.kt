package io.hammock.config

import io.ktor.application.ApplicationCall
import io.ktor.auth.principal
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond

suspend inline fun ApplicationCall.hasOne(role: String, body: (UserPrincipal) -> Unit) {
    this.principal<UserPrincipal>()!!.roles.stream().anyMatch {
        role == it
    }.let {
        if (it) body(this.principal()!!)
        else this.respond(HttpStatusCode.Unauthorized)
    }
}

suspend inline fun ApplicationCall.hasAny(roles: List<String>, body: (UserPrincipal) -> Unit) {
    this.principal<UserPrincipal>()!!.roles.stream().anyMatch {
        roles.contains(it)
    }.let {
        if (it) body(this.principal()!!)
        else this.respond(HttpStatusCode.Unauthorized)
    }
}

suspend inline fun ApplicationCall.hasAll(roles: List<String>, body: (UserPrincipal) -> Unit) {
    this.principal<UserPrincipal>()!!.roles.containsAll(roles).let {
        if (it) body(this.principal()!!)
        else this.respond(HttpStatusCode.Unauthorized)
    }
}

suspend inline fun ApplicationCall.isUser(id: String, body: (UserPrincipal) -> Unit) {
    val principal = this.principal<UserPrincipal>()
    if (principal!!.id == id || principal.roles.contains("ROLE_ADMIN")) body(principal)
    else this.respond(HttpStatusCode.Unauthorized)
}