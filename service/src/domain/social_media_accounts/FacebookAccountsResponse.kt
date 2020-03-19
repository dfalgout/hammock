package io.hammock.domain.social_media_accounts

data class FacebookLinkedAccountsId(
    val id: String
)

data class FacebookLinkedAccountsResponse(
    val instagram_business_account: FacebookLinkedAccountsId?,
    val id: String
)

data class FacebookAccountsResponse(
    val data: List<FacebookAccount>,
    val paging: FacebookPaging
)

data class FacebookCursor(
    val before: String,
    val after: String
)

data class FacebookPaging(
    val cursors: FacebookCursor
)

data class FacebookCategory(
    val id: String,
    val name: String
)

data class FacebookAccount(
    val access_token: String,
    val category: String,
    val category_list: List<FacebookCategory>,
    val name: String,
    val id: String,
    val tasks: List<String>
)