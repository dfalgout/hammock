package io.hammock.config

import io.hammock.repositories.UserRepository
import io.ktor.auth.Authentication.Configuration
import io.ktor.auth.basic
import org.mindrot.jbcrypt.BCrypt
import java.time.Instant

fun Configuration.basic(basicRealm: String, repository: UserRepository) {
    basic("Login") {
        realm = basicRealm
        validate { credentials ->
            repository.findUserByEmail(credentials.name)?.let { user ->
                if (BCrypt.checkpw(credentials.password, user.password))
                    repository.save(user.copy(lastLoginAt = Instant.now()))?.let {
                        UserPrincipal(
                            id = user.id!!,
                            name = "${user.firstName} ${user.lastName}",
                            email = user.email,
                            type = user.type,
                            roles = user.roles
                        )
                    }
                else null
            }
        }
    }
}