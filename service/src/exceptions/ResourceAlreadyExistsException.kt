package io.hammock.exceptions

class ResourceAlreadyExistsException(thing: Any) : ResourceException("${thing::class.simpleName!!} already exists")