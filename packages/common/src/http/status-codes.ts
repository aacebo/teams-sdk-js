/**
 * Defines values for StatusCodes.
 * Possible values include: 200, 400, 401, 404, 405, 409, 426, 500, 501, 502
 *
 * @readonly
 * @enum {number}
 */
export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  MULTIPLE_CHOICES = 300,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  UPGRADE_REQUIRED = 426,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
}
