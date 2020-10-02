import { handler } from "./createUser";
import { CREATE_USER_EVENT_MOCK } from "./mocks/createUserEvent.mock";

describe("Users", () => {
  it("Should not create user with invalid email", async () => {
    const wrongData = CREATE_USER_EVENT_MOCK;
    wrongData.request.userAttributes.email = "wrongemail";

    try {
      await handler(wrongData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        '[{"property":"email","children":[],"constraints":{"isEmail":"email must be an email"}}]'
      );
    }
  });

  it("Should not create user with invalid username", async () => {
    const wrongData = CREATE_USER_EVENT_MOCK;
    // @ts-expect-error Expecting error, because userName type is string
    wrongData.userName = 123123123;

    try {
      await handler(wrongData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        '[{"property":"username","children":[],"constraints":{"isString":"username must be a string"}},{"property":"email","children":[],"constraints":{"isEmail":"email must be an email"}}]'
      );
    }
  });
});
