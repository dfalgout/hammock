package io.hammock.config

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.auth.Authentication.Configuration
import io.ktor.auth.Principal
import io.ktor.auth.jwt.jwt

data class UserPrincipal(
    val id: String,
    val name: String,
    val email: String,
    val type: String,
    val roles: List<String>
) : Principal

open class SimpleJWT(secret: String) {
    private val algorithm = Algorithm.HMAC256(secret)
    val verifier = JWT.require(algorithm)?.build()
    fun sign(principal: UserPrincipal): String = JWT.create()
        .withClaim("id", principal.id)
        .withClaim("name", principal.name)
        .withClaim("email", principal.email)
        .withClaim("type", principal.type)
        .withArrayClaim("roles", principal.roles.toTypedArray())
        .sign(algorithm)
}

fun Configuration.jwt(simpleJWT: SimpleJWT) {
    jwt {
        verifier(simpleJWT.verifier!!)
        validate {
            UserPrincipal(
                it.payload.getClaim("id").asString(),
                it.payload.getClaim("name").asString(),
                it.payload.getClaim("email").asString(),
                it.payload.getClaim("type").asString(),
                it.payload.getClaim("roles").asList(String::class.java)
            )
        }
    }
}