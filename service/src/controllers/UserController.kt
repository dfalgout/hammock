package io.hammock.controllers

import io.hammock.config.hasOne
import io.hammock.config.isUser
import io.hammock.domain.*
import io.hammock.services.SocialMediaLinkingService
import io.hammock.services.UserService
import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.http.HttpStatusCode
import io.ktor.locations.Location
import io.ktor.locations.get
import io.ktor.locations.post
import io.ktor.locations.put
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Routing
import org.koin.ktor.ext.inject


@Location("/users") class UsersRequest {
    @Location("/") class UserCreateRequest
    @Location("/{id}") data class UserByIdRequest(val id: String) {
        @Location("/link-instagram") data class LinkInstagram(val parent: UserByIdRequest)
    }
}

@Location("/email-exists") class EmailExistsRequest

fun Routing.user() {
    val service by inject<UserService>()
    val socialMediaService by inject<SocialMediaLinkingService>()

    post<UsersRequest.UserCreateRequest> {
        val user = call.receive<CreateUser>()
        service.create(user)?.let {
            call.respond(it)
        } ?: call.respond(HttpStatusCode.BadRequest, "Failed to create new User")
    }

    put<EmailExistsRequest> {
        val email = call.receive<ValidateEmail>()
        call.respond(service.emailExists(email.email))
    }

    authenticate {
        get<UsersRequest> {
            call.hasOne("ROLE_ADMIN") {
                call.respond(service.findAll())
            }
        }

        get<UsersRequest.UserByIdRequest> { user ->
            call.isUser(user.id) {
                service.findById(user.id)?.let {
                    call.respond(it)
                } ?: call.respond(HttpStatusCode.BadRequest, "User not found")
            }
        }

        put<UsersRequest.UserByIdRequest> { user ->
            call.isUser(user.id) {
                val updateUser = call.receive<UserProfile>()
                service.update(user.id, updateUser)?.let {
                    call.respond(it)
                } ?: call.respond(HttpStatusCode.BadRequest, "User not found")
            }
        }

        put<UsersRequest.UserByIdRequest.LinkInstagram> { user ->
            call.isUser(user.parent.id) {
                val request = call.receive<LinkInstagramRequest>()
                socialMediaService.updateInstagramAccount(user.parent.id, request.token, request.expiration)?.let {
                    call.respond(it.toDomain())
                } ?: call.respond(HttpStatusCode.BadRequest, "Failed to link account")
            }
        }
    }
}