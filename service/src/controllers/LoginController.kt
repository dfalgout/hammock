package io.hammock.controllers

import io.hammock.config.SimpleJWT
import io.hammock.config.UserPrincipal
import io.hammock.domain.toUserPrincipal
import io.hammock.services.UserService
import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.auth.principal
import io.ktor.http.HttpStatusCode
import io.ktor.locations.Location
import io.ktor.locations.post
import io.ktor.locations.put
import io.ktor.response.respond
import io.ktor.routing.Routing
import org.koin.ktor.ext.inject

@Location("/login") class LoginRequest
@Location("/refresh-token") class RefreshTokenRequest

data class JWTResponse(val token: String)

fun Routing.login(signer: SimpleJWT) {
    val service by inject<UserService>()

    authenticate("Login") {
        post<LoginRequest> {
            call.principal<UserPrincipal>()?.let {
                call.respond(JWTResponse(signer.sign(it)))
            }
        }
    }

    authenticate {
        put<RefreshTokenRequest> {
            call.principal<UserPrincipal>()?.let {
                service.findUserById(it.id)?.let { user ->
                    call.respond(JWTResponse(signer.sign(user.toUserPrincipal())))
                } ?: call.respond(HttpStatusCode.Unauthorized)
            }
        }
    }
}