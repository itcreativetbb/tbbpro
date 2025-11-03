import React from "react";
import { render, screen, act } from "@testing-library/react";
import NowTime from "../NowTime";
import moment from "moment-timezone";

// Set the timezone to Africa/Accra for testing
moment.tz.setDefault("Africa/Accra");

describe("NowTime component", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("renders the component with the correct initial time and location", async () => {
		const currentTime = moment();
		render(<NowTime />);

		// Check if the location is displayed correctly
		const timeDisplay = await screen.findByTestId("time-display");
		expect(timeDisplay).toHaveTextContent(/Accra/i);

		// Check if the time is displayed correctly
		expect(timeDisplay).toHaveTextContent(
			new RegExp(currentTime.format("h:mm A"), "i")
		);
	});

	it("updates the time after one minute", async () => {
		const initialTime = moment();
		render(<NowTime />);

		// Check initial time
		const timeDisplay = await screen.findByTestId("time-display");
		expect(timeDisplay).toHaveTextContent(
			new RegExp(initialTime.format("h:mm A"), "i")
		);

		// Fast-forward time by one minute
		act(() => {
			jest.advanceTimersByTime(60000);
		});

		// Check if the time has been updated
		const updatedTime = initialTime.add(1, "minute");
		expect(timeDisplay).toHaveTextContent(
			new RegExp(updatedTime.format("h:mm A"), "i")
		);
	});
});
