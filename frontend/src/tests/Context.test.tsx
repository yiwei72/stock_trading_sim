import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  EmailContext,
  EmailProvider,
  UserAuthContext,
  UserAuthProvider,
} from "../Context";

describe("Email Context", () => {
  it("should render the email context provider with correct email", () => {
    const { getByTestId } = render(
      <EmailProvider>
        <EmailContext.Consumer>
          {({ email }) => <div data-testid="email">{email}</div>}
        </EmailContext.Consumer>
      </EmailProvider>
    );

    const emailNode = getByTestId("email");
    expect(emailNode.textContent).toBe("");
  });

  it("should update the email", () => {
    const { getByTestId } = render(
      <EmailProvider>
        <EmailContext.Consumer>
          {({ email, updateEmail }) => (
            <>
              <div data-testid="email">{email}</div>
              <button
                data-testid="update-email-button"
                onClick={() => updateEmail("test@example.com")}
              >
                Update email
              </button>
            </>
          )}
        </EmailContext.Consumer>
      </EmailProvider>
    );

    const emailNode = getByTestId("email");
    const updateEmailButton = getByTestId("update-email-button");
    expect(emailNode.textContent).toBe("");

    fireEvent.click(updateEmailButton);
    expect(emailNode.textContent).toBe("test@example.com");
  });
});

describe("UserAuth Context", () => {
  it("should render the user auth context provider with correct first name", () => {
    const { getByTestId } = render(
      <UserAuthProvider>
        <UserAuthContext.Consumer>
          {({ firstName }) => <div data-testid="firstName">{firstName}</div>}
        </UserAuthContext.Consumer>
      </UserAuthProvider>
    );

    const firstNameNode = getByTestId("firstName");
    expect(firstNameNode.textContent).toBe("");
  });

  it("should update the email", () => {
    const { getByTestId } = render(
      <UserAuthProvider>
        <UserAuthContext.Consumer>
          {({ firstName, updateFirstName }) => (
            <>
              <div data-testid="firstName">{firstName}</div>
              <button
                data-testid="update-firstName-button"
                onClick={() => updateFirstName("firstName")}
              >
                Update firstName
              </button>
            </>
          )}
        </UserAuthContext.Consumer>
      </UserAuthProvider>
    );

    const firstNameNode = getByTestId("firstName");
    const updateFirstNameButton = getByTestId("update-firstName-button");
    expect(firstNameNode.textContent).toBe("");

    fireEvent.click(updateFirstNameButton);
    expect(firstNameNode.textContent).toBe("firstName");
  });
});
