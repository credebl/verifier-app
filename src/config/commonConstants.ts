export const schemaVersionRegex = /^\d{1,5}(?=.*[0-9])(?:\.\d{1,5})?(?:\.\d{1,5})?$/gm

export const apiStatusCodes = {
    API_STATUS_SUCCESS : 200,
    API_STATUS_CREATED : 201,
    API_STATUS_BAD_REQUEST : 400,
    API_STATUS_UNAUTHORIZED : 401,
    API_STATUS_NOT_FOUND : 404
}
