import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { EmailContext, EmailProvider } from "../Context";

describe("Email Context", () => {
  it("should render the email context provider with correct email", () => {
    const email = "test@example.com";
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
