import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import BookingForm from "./BookingForm";
import { useBookingCreate, useBookingsGet } from "./hooks";
import { ROUTES } from "@/router/consts";
import { User } from "../user/types";

jest.mock("./hooks", () => ({
  useLoginUser: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUser: User = {  
    _id: '1',  
    name: 'John Doe',  
    email: 'john.doe@example.com',  
};  

describe("BookingForm Component", () => {
  beforeEach(() => {
    // (useBookingCreate as jest.Mock).mockReturnValue({
    //   mutateAsync: jest.fn(),
    // });
    // (useBookingsGet as jest.Mock).mockReturnValue({
    //     mutateAsync: jest.fn(),
    // });
  });

  const renderComponent = () =>
    render(
      <Router>
        <UserContext.Provider
          value={{
            login: () => {},
            logout: jest.fn(),
            user: mockUser,
            isLoggedIn: true,
          }}
        >
        </UserContext.Provider>
      </Router>
    );

  test("renders booking form", () => {
    renderComponent();
    expect(screen.getByLabelText("date")).toBeInTheDocument();
    expect(screen.getByLabelText("time")).toBeInTheDocument();
    expect(screen.getByText("Book now")).toBeInTheDocument();
  });
});