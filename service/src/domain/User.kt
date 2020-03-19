package io.hammock.domain

import io.hammock.config.UserPrincipal
import org.bson.codecs.pojo.annotations.BsonId
import java.time.Instant
import java.time.LocalDate

data class ValidateEmail(val email: String)

data class CreateUser(
    val email: String,
    val firstName: String,
    val lastName: String,
    val password: String,
    val userType: UserType,
    val roleType: RoleType
)

data class UserProfile(
    @BsonId val id: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val shippingAddress: Address?,
    val birthDate: String?,
    val gender: GenderType?,
    val instagramLinked: Boolean
)

data class User(
    @BsonId val id: String? = null,
    val email: String,
    val firstName: String,
    val lastName: String,
    val password: String,
    val shippingAddress: Address?,
    val birthDate: String?,
    val gender: GenderType?,
    val instagramLinked: Boolean,
    val linkedInstagramAccount: LinkedInstagramAccount?,
    val type: String,
    val roles: List<String>,
    val createdAt: Instant = Instant.now(),
    val lastLoginAt: Instant = Instant.now()
)

fun User.toDomain() : UserProfile {
    return UserProfile(
        id = this.id!!,
        email = this.email,
        firstName = this.firstName,
        lastName = this.lastName,
        shippingAddress = this.shippingAddress,
        birthDate = this.birthDate,
        gender = this.gender,
        instagramLinked = this.instagramLinked
    )
}

fun User.toUserPrincipal() : UserPrincipal {
    return UserPrincipal(
        id = this.id!!,
        email = this.email,
        name = "${this.firstName} ${this.lastName}",
        type = this.type,
        roles = this.roles
    )
}

fun CreateUser.toUser() : User {
    val type = when(this.userType) {
        UserType.BRAND -> "BRAND"
        UserType.CREATOR -> "CREATOR"
    }

    val roles = when(this.roleType) {
        RoleType.ADMIN -> listOf("ROLE_ADMIN")
        RoleType.STANDARD -> listOf("ROLE_STANDARD")
        RoleType.PREMIUM -> listOf("ROLE_PREMIUM")
    }

    return User(
        email = this.email,
        firstName = this.firstName,
        lastName = this.lastName,
        password = this.password,
        shippingAddress = null,
        birthDate = null,
        gender = null,
        instagramLinked = false,
        linkedInstagramAccount = null,
        type = type,
        roles = roles
    )
}