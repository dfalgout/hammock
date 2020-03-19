package io.hammock.domain

import java.time.Instant

data class LinkedInstagramAccount(
    val accessToken: String,
    val facebookId: String,
    val instagramId: String,
    val name: String,
    val data_access_expiration_time: Instant
)

data class LinkInstagramRequest(
    val token: String,
    val expiration: Long
)