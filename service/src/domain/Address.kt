package io.hammock.domain

data class Address(
    val street1: String,
    val street2: String?,
    val city: String,
    val state: String,
    val zipCode: String
);