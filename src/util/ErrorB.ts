/**
 * ErrorB
 */
export default class ErrorB {

    public static PHONE_MISSING: string =         '{"code": "200", "msg": "Missing the phone number"}';

    public static PHONE_EXIST: string =           '{"code": "201", "msg": "The phone number exist"}';

    public static PHONE_INVALID: string =          '{"code": "202", "msg": "The phone number is invalid"}';

    public static EMAIL_MISSING: string =         '{"code": "203", "msg": "Missing the email address"}';

    public static EMAIL_EXIST: string =           '{"code": "204", "msg": "The email address exist"}';

    public static PASSWORD_MISSING: string =      '{"code": "205", "msg": "Missing password"}';

}